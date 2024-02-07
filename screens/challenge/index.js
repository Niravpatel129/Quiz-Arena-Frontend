import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { useAuth } from '../../context/auth/AuthContext';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import socketService from '../../services/socketService';

export default function ChallengeScreen({ route }) {
  const [queueTime, setQueueTime] = useState(1);
  const routeParam = route.params;
  const intervalRef = useRef(null);
  const categoryName = routeParam?.categoryName;
  const gameId = routeParam?.gameId || '123';
  const { userData, fetchUser } = useAuth();
  const navigation = useNavigation();
  const [gameExpired, setGameExpired] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    startTimer();

    socketService.emit('joinChallengeQueue', {
      gameId: gameId,
      category: categoryName,
    });

    socketService.on('challengeExpired', () => {
      if (redirecting) return;

      setRedirecting(true);
      if (!navigation) return null;

      console.log('challengeExpired');

      setGameExpired(true);
      clearInterval(intervalRef.current);

      // wait 3 seconds before redirecting
      setTimeout(() => {
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }

        navigation.navigate('Home');
      }, 3000);
    });

    socketService.on('game_start', (data) => {
      if (redirecting) return;

      setRedirecting(true);

      clearInterval(intervalRef.current);

      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Game',
            params: {
              game: data.game,
              gameSessionId: data.gameSessionId,
              players: data.players,
            },
          },
        ],
      });
    });

    return () => {
      clearInterval(intervalRef.current);

      socketService.off('challengeExpired');
      socketService.off('game_start');

      socketService.emit('leaveChallengeQueue', {
        gameId: gameId,
        category: categoryName,
      });
    };
  }, []);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setQueueTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const PlayerCard = (playerData, isPlaceholder) => {
    return (
      <View
        style={{
          borderRadius: 30,
        }}
      >
        <Image
          style={{
            overflow: 'hidden',
            width: 120,
            height: 120,
            borderRadius: 30,
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: '#69829c',
          }}
          source={{
            uri: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
            headers: {
              Accept: '*/*',
            },
          }}
        />
        <Text
          style={{
            color: '#69829c',
            fontSize: 16,
            fontFamily: 'Inter-Bold',
            textAlign: 'center',
            marginTop: 10,
            textShadowColor: isPlaceholder ? '#000' : 'transparent',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
          }}
        >
          {isPlaceholder ? 'Waiting...' : capitalizeFirstLetter(playerData.playerName)}{' '}
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
        }}
      >
        <Ionicons
          name='close'
          size={24}
          color='black'
          // style={{ position: 'absolute', top: 20, left: 20 }}
        />
      </TouchableOpacity>
      {!gameExpired && (
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
                color: '#1e1e1e',
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
      )}

      {!gameExpired ? (
        <>
          <View>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#1e1e1e',
                  fontSize: 20,
                  fontFamily: 'Inter-Regular',
                  textAlign: 'center',
                  marginBottom: 10,
                }}
              >
                Waiting for your opponent to join...
              </Text>
              <Image
                source={{
                  uri: 'https://cdn.discordapp.com/attachments/1201815017612398662/1202213592493981787/IMG_3419.webp?ex=65cca3a8&is=65ba2ea8&hm=3b03405ac15ecc894bab9a242ba73b08301b8cd8e5cb8dd634f5dbef8290f006&',
                }}
                style={{ width: 200, height: 200 }}
              />
              <Text
                style={{
                  color: '#1e1e1e',
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
                  color: '#1e1e1e',
                  fontSize: 16,
                  fontFamily: 'Inter-Regular',
                  textAlign: 'center',
                  marginTop: 10,
                }}
              >
                Time waiting: {Math.floor(queueTime)} {queueTime % 60 === 1 ? 'second' : 'seconds'}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              // marginTop: 40,
              // flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: 'https://cdn.discordapp.com/attachments/1201815017612398662/1202213592493981787/IMG_3419.webp?ex=65cca3a8&is=65ba2ea8&hm=3b03405ac15ecc894bab9a242ba73b08301b8cd8e5cb8dd634f5dbef8290f006&',
              }}
              style={{ width: 200, height: 200 }}
            />
            <Text
              style={{
                color: '#1e1e1e',
                fontSize: 25,
                fontFamily: 'Inter-Regular',
                textAlign: 'center',
              }}
            >
              Your challenge has expired!
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#2a78e6',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
                marginHorizontal: 20,
              }}
              onPress={() => navigation.navigate('Home')}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Inter-Regular',
                  textAlign: 'center',
                }}
              >
                Return to homepage
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
