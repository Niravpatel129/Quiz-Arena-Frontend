import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
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
  const [gameExpired, setGameExpired] = useState(false);

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
      if (!navigation) return null;

      setGameExpired(true);
      clearInterval(intervalRef.current);
    });

    socketService.on('game_start', (data) => {
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
            uri: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
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
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: '100%', padding: 5 }}
    >
      <View>
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
        )}

        {!gameExpired ? (
          <>
            <View>
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
                  Waiting for your opponent to join...
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
                  Time in Queue: {Math.floor(queueTime)}{' '}
                  {queueTime % 60 === 1 ? 'second' : 'seconds'}
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
              <Text
                style={{
                  color: 'white',
                  fontSize: 25,
                  fontFamily: 'Inter-Regular',
                  textAlign: 'center',
                }}
              >
                Your challenge has expired, return back to homepage
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                  marginHorizontal: 20,
                }}
                onPress={() => navigation.navigate('CategoriesHome')}
              >
                <Text
                  style={{
                    color: 'black',
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
    </LinearGradient>
  );
}
