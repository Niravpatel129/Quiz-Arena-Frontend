import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { newRequest } from '../../api/newRequest';
import { useAuth } from '../../context/auth/AuthContext';
import { useUpdateContext } from '../../context/update/UpdateContext';
import { keys } from '../../keys';
import socketService from '../../services/socketService';

const IS_PRODUCTION = process.env.EXPO_PUBLIC_PROD_BACKEND || process.env.NODE_ENV === 'production';

export default function QueueScreen2({ route }) {
  const navigation = useNavigation();
  const [queueTime, setQueueTime] = useState(1);
  const categoryName = route.params?.categoryName || 'Logos';
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(0);
  const { userData, fetchUser } = useAuth();
  console.log('🚀  userData:', userData);
  const { setUpdateRequired } = useUpdateContext();
  const intervalRef = useRef(null);
  const [defaultQueueTime, setDefaultQueueTime] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await newRequest.get(`/homepage/config/${keys.version}`);
        setDefaultQueueTime(!IS_PRODUCTION ? 3 : res.data.queueTime);

        if (res.data?.updatedRequired) {
          navigation.navigate('Categories');

          setUpdateRequired(true);
        }
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Connection Error',
          text2: 'Please check your internet connection.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });

        navigation.navigate('Categories');

        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!socketService.connected) {
      socketService.connect();
    }

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

  useEffect(() => {
    if (queueTime === 100000) {
      console.log('adding bot');
      socketService.emit('add_bot', categoryName);
    }
  }, [queueTime]);

  useEffect(() => {
    socketService.emit('join_queue', categoryName);
    startTimer();

    // socketService.on('queue_update', (data) => {
    //   setPlayersInQueue(data.queue.length);
    // });

    socketService.on('game_start', (data) => {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      clearInterval(intervalRef.current);

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Game',
            params: { game: data.game, gameSessionId: data.gameSessionId, players: data.players },
          },
        ],
      });
    });

    return () => {
      setQueueTime(0);
      socketService.emit('leave_queue', categoryName);
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setQueueTime((prevTime) => prevTime + 1);
    }, 1000);
  }, []);

  const renderPlayerCard = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 30,
          paddingHorizontal: 10,
          backgroundColor: '#3F95F2',
          borderRadius: 20,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'poppins-bold',
                fontSize: RFValue(19),
                textTransform: 'capitalize',
              }}
            >
              {userData?.username || 'Anonymous'}
            </Text>
            <CountryFlag isoCode='us' size={14} />
          </View>

          <View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginTop: 5,
              }}
            >
              {userData?.averageRating} Rating
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM6A1erx9khLr3mjq5FxsfMqW6vf5b8lvlmcqG88p-w&s',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
            }}
          />
        </View>
      </View>
    );
  };

  const renderSearchingCard = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 30,
          paddingHorizontal: 10,
          backgroundColor: '#EC80B4',
          borderRadius: 20,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: '#FBE8F2',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name='search' size={50} color='#EC80B4' />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',

              gap: 5,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'poppins-bold',
                fontSize: RFValue(19),
                maxWidth: 160,
              }}
            >
              Searching Opponent ....
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#EC80B4', '#3F95F2']}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 40,
            left: 20,
            padding: 5,
          }}
        >
          <Ionicons name='arrow-back' size={34} color='white' />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 20,
            marginVertical: 20,
            borderRadius: 25,
          }}
        >
          {renderPlayerCard()}
          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <Image
              source={require('../../assets/vs_icon.png')}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View>{renderSearchingCard()}</View>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: RFValue(12),
                fontFamily: 'poppins-regular',
                marginTop: 'auto',
              }}
            >
              In Queue for
            </Text>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: RFValue(12),
                marginVertical: 3,
                fontFamily: 'poppins-bold',
                textTransform: 'capitalize',
              }}
            >
              {categoryName}
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Image
              source={require('../../assets/hour_glass.png')}
              style={{ width: 50, height: 50 }}
            />
            <Text
              style={{
                fontSize: RFValue(12),
                fontWeight: 'bold',
                fontFamily: 'poppins-bold',
                marginTop: 3,
                color: '#5E6064',
              }}
            >
              Time In Queue:{' '}
              <Text
                style={{
                  fontFamily: 'poppins-bold',
                  color: '#3F95F2',
                }}
              >
                {/* 00:00:00 */}
                {queueTime}
              </Text>
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              color: '#5E6064',
              fontFamily: 'poppins-regular',
              marginTop: 5,
            }}
          >
            <Text>Estimated Wait Time: 00:02:03</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
