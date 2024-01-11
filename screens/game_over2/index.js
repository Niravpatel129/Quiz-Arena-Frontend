import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { SafeAreaView } from 'react-native-safe-area-context';
import EndGameChart from '../../components/EndGameChart';
import QuestionsPostGame from '../../components/QuestionsPostGame/QuestionsPostGame';
import RematchModal from '../../components/RematchModal/RematchModal';
import Scoresheet from '../../components/Scoresheet/Scoresheet';
import useInAppReview from '../../hooks/useInAppReview';
import socketService from '../../services/socketService';

const fakeData2 = {
  gameSessionId: '1',
  yourData: {
    id: '1',
    username: 'Bob',
    rating: 1400,
    ratingChange: 30,
    result: 'winner',

    avatar:
      'https://t4.ftcdn.net/jpg/01/62/72/29/360_F_162722972_3SlhxozZGdL3rGuWgKyVP2NTs8POtX2n.jpg',
    gameData: {
      scores: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    },
  },
  opponentData: {
    id: '2',
    username: 'Zezima',
    result: 'loser',
    rating: 1400,
    ratingChange: -30,
    avatar:
      'https://t4.ftcdn.net/jpg/01/62/72/29/360_F_162722972_3SlhxozZGdL3rGuWgKyVP2NTs8POtX2n.jpg',
    gameData: {
      scores: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    },
  },
};

export default function GameOver2({ navigation, route }) {
  const [rematchModalVisible, setRematchModalVisible] = React.useState(false);
  const fakeData = route.params?.results || fakeData2;
  console.log('🚀  fakeData:', fakeData);
  const [scaleAnimation] = React.useState(new Animated.Value(0)); // Add this line

  const requestReview = useInAppReview();

  if (!fakeData) return null;

  useEffect(() => {
    if (!fakeData) return;

    if (fakeData?.yourData?.result === 'winner') requestReview();
  }, [fakeData.yourData.result]);

  useEffect(() => {
    if (!fakeData) return;

    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fakeData.yourData.result]);

  const handleRematch = () => {
    socketService.socket.emit('triggerRematch', {
      gameId: fakeData.gameSessionId,
      otherPlayerSocketId: fakeData.opponentData.socketId,
      otherPlayerUserId: fakeData.opponentData.id,
    });

    alert('Rematch requested');
  };

  const handleRematchAccept = () => {
    console.log('emiting acceptRematch');
    socketService.socket.emit('acceptRematch', {
      gameId: fakeData.gameSessionId,
      otherPlayerSocketId: fakeData.opponentData.socketId,
      otherPlayerUserId: fakeData.opponentData.id,
      category: fakeData.category,
    });
  };

  const handleRematchDecline = () => {
    console.log('emiting declineRematch');
    socketService.socket.emit('declineRematch', {
      gameId: fakeData.gameSessionId,
      otherPlayerSocketId: fakeData.opponentData.socketId,
      otherPlayerUserId: fakeData.opponentData.id,
    });
  };

  useEffect(() => {
    socketService.socket.on('rematchRequest', (gameSessionId) => {
      console.log('rematch request');

      setRematchModalVisible(true);
    });

    socketService.socket.on('rematchAccepted', (gameSessionId) => {
      console.log('rematch accepted');
      navigation.navigate('Game', { game: data.game });
    });

    socketService.socket.on('rematchDeclined', (gameSessionId) => {
      console.log('rematch declined');
      alert('Rematch declined');
      setRematchModalVisible(false);
    });
  }, []);

  const playerCard = (playerInfo) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!playerInfo.userId) return;

          navigation.navigate('Profile', { userId: playerInfo.userId });
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: playerInfo.result === 'winner' ? '#00c03d' : '#ff0000',
          }}
          source={{
            uri:
              playerInfo.avatar ||
              'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 3,
            color: '#fff',
            fontFamily: 'Inter-Black',
            fontWeight: 'bold',
            fontSize: 16,
            alignItems: 'center',
          }}
        >
          {playerInfo.username}
          <Text
            style={{
              marginHorizontal: 5,
            }}
          >
            <CountryFlag isoCode={playerInfo.country} size={16} />
          </Text>
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 3,
            color: '#fff',
            fontFamily: 'Inter-Black',
            fontWeight: 'bold',
            fontSize: 12,
            flexDirection: 'row',
            gap: 2,
          }}
        >
          {playerInfo.rating || 1200}

          <Text
            style={{
              color: playerInfo.ratingChange > 0 ? '#00c03d' : '#ff0000',
              fontWeight: 'bold',
              fontFamily: 'Inter-Black',
            }}
          >
            {playerInfo.ratingChange > 0 ? '+' : ''}({playerInfo.ratingChange})
          </Text>
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        height: '100%',
      }}
    >
      <SafeAreaView>
        <RematchModal
          modalVisible={rematchModalVisible}
          setModalVisible={setRematchModalVisible}
          handleRematchAccept={handleRematchAccept}
          handleRematchDecline={handleRematchDecline}
          otherPlayer={fakeData.opponentData.username}
        />
        <ScrollView
          style={{
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 100,
              right: 10,
            }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Categories' }],
              });
            }}
          >
            <Ionicons name='ios-close' size={40} color='#fff' />
          </TouchableOpacity>
          <View>
            <Animated.Text
              style={{
                fontSize: 40,
                color: fakeData.yourData.result === 'winner' ? '#00c03d' : '#ff0000',
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 20,
                fontFamily: 'Inter-Black',
                transform: [{ scale: scaleAnimation }],
              }}
            >
              {fakeData.yourData.result === 'winner' ? 'You Win!' : 'You Lose!'}
            </Animated.Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              marginBottom: 30,
              justifyContent: 'space-evenly',
            }}
          >
            <View>{playerCard(fakeData.yourData)}</View>
            <View>{playerCard(fakeData.opponentData)}</View>
          </View>

          <Scoresheet
            playerOneData={{
              username: fakeData.yourData.username,
              scores: fakeData.yourData.gameData.scores,
            }}
            playerTwoData={{
              username: fakeData.opponentData.username,
              scores: fakeData.opponentData.gameData.scores,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
              gap: 10,
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#32547A6B',
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#667EB7',
                padding: 15,
              }}
            >
              <Ionicons name='ios-share-outline' size={22} color='#fff' />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#32547A6B',
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#667EB7',
                padding: 15,
                flex: 1,
              }}
              onPress={() => {
                handleRematch();
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Inter-Black',
                    fontSize: 18,
                    textAlign: 'center',
                  }}
                >
                  Rematch
                </Text>
                <Ionicons
                  style={{
                    paddingLeft: 10,
                  }}
                  name='ios-refresh-outline'
                  size={24}
                  color='#fff'
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#32547A6B',
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#667EB7',
                padding: 15,
              }}
            >
              <Ionicons name='ios-chatbox' size={22} color='#fff' />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Categories' }],
              });
            }}
            style={{
              backgroundColor: '#32547A6B',
              borderWidth: 2,
              borderRadius: 15,
              borderColor: '#667EB7',
              padding: 15,
              flex: 1,
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Inter-Black',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                Play Again
              </Text>
              <Ionicons
                style={{
                  paddingLeft: 10,
                }}
                name='ios-play'
                size={24}
                color='#fff'
              />
            </View>
          </TouchableOpacity>
          <View>
            <EndGameChart
              chartData={{
                playerOne: {
                  name: fakeData?.yourData?.username,
                  scores: fakeData?.yourData?.gameData?.scores.map((score) => score.points),
                },
                playerTwo: {
                  name: fakeData?.opponentData?.username,
                  scores: fakeData?.opponentData?.gameData.scores.map((score) => score.points),
                },
              }}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <QuestionsPostGame
              questions={fakeData.rounds.map((roundData, index) => {
                // fakeData.playersRoundData

                const yourAnswers = fakeData.playersRoundData.find(
                  (player) => player.name === fakeData.yourData.username,
                );

                const opponentAnswers = fakeData.playersRoundData.find(
                  (player) => player.name === fakeData.opponentData.username,
                );

                return {
                  Question: roundData.questionText,
                  QuestionId: roundData.questionId,
                  Answers: roundData.options,
                  CorrectAnswer: roundData.correctAnswer,
                  QuestionImage: roundData.helperImage,
                  PlayerAnswers: {
                    you: {
                      playerName: fakeData.yourData.username,
                      answer: yourAnswers.answers[index].answer,
                      playerAvatar: fakeData.yourData.avatar,
                    },
                    opponent: {
                      playerName: fakeData.opponentData.username,
                      answer: opponentAnswers.answers[index].answer,
                      playerAvatar: fakeData.opponentData.avatar,
                    },
                  },
                };
              })}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
