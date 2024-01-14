import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { newRequest } from '../../api/newRequest';
import { useAuth } from '../../context/auth/AuthContext';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import socketService from '../../services/socketService';

const appVersion = '5';
const IS_PRODUCTION = process.env.EXPO_PUBLIC_PROD_BACKEND || process.env.NODE_ENV === 'production';

export default function QueueScreen({ route, navigation }) {
  const [queueTime, setQueueTime] = useState(1);
  const [playerImageIndex, setPlayerImageIndex] = useState(0);
  const routeParam = route.params;
  const intervalRef = useRef(null);
  const [playersInQueue, setPlayersInQueue] = useState(0);
  const categoryName = routeParam?.categoryName || 'Logos';
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(0);
  const { userData, fetchUser } = useAuth();
  const [defaultQueueTime, setDefaultQueueTime] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await newRequest.get(`/homepage/config/${appVersion}`);
        setDefaultQueueTime(!IS_PRODUCTION ? 3 : res.data.queueTime);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    function getRandomWaitTime() {
      const now = new Date();
      const hour = now.getHours();
      let waitTimeSeconds;

      if (hour >= 8 && hour <= 18) {
        // Shorter wait time during typical working hours (30 seconds to 1.5 minutes)
        waitTimeSeconds = Math.floor(Math.random() * (90 - 30 + 1)) + 30;
      } else {
        // Slightly longer wait time during off-hours (1 to 2 minutes)
        waitTimeSeconds = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
      }

      // Formatting the wait time as minutes:seconds
      const minutes = Math.floor(waitTimeSeconds / 60);
      const seconds = waitTimeSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    setEstimatedWaitTime(getRandomWaitTime());
  }, []);

  const playerImages = [
    'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*',
    'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg',
    'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
  ];

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setQueueTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    if (queueTime === defaultQueueTime) {
      console.log('adding bot');
      socketService.emit('add_bot', categoryName);
    }
  }, [queueTime]);

  useEffect(() => {
    socketService.emit('join_queue', categoryName);
    startTimer();

    socketService.on('queue_update', (data) => {
      setPlayersInQueue(data.queue.length);
    });

    socketService.on('game_start', (data) => {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      navigation.navigate('Game', { game: data.game });
      clearInterval(intervalRef.current);
    });

    const interval = setInterval(() => {
      setPlayerImageIndex((prevIndex) => (prevIndex + 1) % playerImages.length);
    }, 2000);

    return () => {
      setQueueTime(0);
      socketService.emit('leave_queue', categoryName);
      clearInterval(intervalRef.current);
      clearInterval(interval);
    };
  }, []);

  const PlayerCard = (playerData, isPlaceholder) => {
    return (
      <View style={{}}>
        <Image
          style={{
            width: 120,
            height: 120,
            borderRadius: 30,
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: '#69829c',
          }}
          source={{
            uri: isPlaceholder ? playerImages[playerImageIndex] : playerData.avatar,
            headers: {
              Accept: '*/*',
            },
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'Inter-Bold',
            textAlign: 'center',
            marginTop: 10,
            textShadowColor: isPlaceholder ? '#000' : 'transparent',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
          }}
        >
          {isPlaceholder ? 'Searching...' : capitalizeFirstLetter(playerData.playerName)}{' '}
          <CountryFlag isoCode={playerData.country || ''} size={14} />
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'Inter-Bold',
            textAlign: 'center',
            marginTop: 2,
            textShadowColor: isPlaceholder ? '#000' : 'transparent',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
          }}
        >
          {isPlaceholder ? '' : `${playerData.elo} Elo`}
        </Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: '100%', padding: 5 }}
    >
      <View
        style={{
          alignItems: 'flex-end',
          marginTop: 40,
          paddingTop: 25,
          marginRight: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Categories');
          }}
        >
          <Ionicons name='close' size={44} color='white' />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <View>
          {PlayerCard(
            {
              tag: 'Player Tag',
              playerName: userData?.username || 'Alex Smith',
              country: userData?.country || 'ca',
              avatar: userData?.avatar || '',
              elo: userData?.allRating[categoryName] || 1200,
              experience: userData?.experience,
            },
            false,
          )}
        </View>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 45,
              fontFamily: 'Inter-Regular',
              textAlign: 'center',
            }}
          >
            VS
          </Text>
        </View>
        <View>{PlayerCard({}, true)}</View>
      </View>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            fontFamily: 'Inter-Regular',
            textAlign: 'center',
          }}
        >
          In Queue for
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            fontFamily: 'Inter-Bold',
            textAlign: 'center',
          }}
        >
          {capitalizeFirstLetter(categoryName) || 'Logos'}
        </Text>
      </View>
      <View
        style={{
          marginTop: 40,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'Inter-Regular',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          Time in Queue: {queueTime % 60 < 10 ? '0' + (queueTime % 60) : queueTime % 60}{' '}
          {queueTime % 60 === 1 ? 'second' : 'seconds'}
        </Text>
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 11,
          fontFamily: 'Inter-Regular',
          textAlign: 'center',
          position: 'absolute',
          bottom: 50,
          width: '100%',
        }}
      >
        Estimated Wait Time: <Text style={{ color: 'white' }}>{estimatedWaitTime}</Text>
      </Text>
    </LinearGradient>
  );
}
