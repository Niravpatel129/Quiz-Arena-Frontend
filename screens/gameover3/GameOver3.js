import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import RematchModal from '../../components/RematchModal/RematchModal';
import useInAppReview from '../../hooks/useInAppReview';
import socketService from '../../services/socketService';
import Exp from './components/Exp';
import PlayerCards from './components/PlayerCards';
import Questions from './components/Questions';
import ScoreCard from './components/ScoreCard';
import TryAgain from './components/TryAgain';

export default function GameOver3({ route }) {
  const GameResults = route.params?.results;
  const navigation = useNavigation();
  const [rematchModalVisible, setRematchModalVisible] = React.useState(false);
  const requestReview = useInAppReview();
  const translateY = useSharedValue(50); // Starting below the view by 50 pixels
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withSpring(0); // Animate to its original position
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Categories');
    });

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!GameResults) return;

    if (GameResults?.yourData?.didWin) requestReview();
  }, [route.params?.results]);

  const handleRematch = () => {
    socketService.socket.emit('triggerRematch', {
      gameId: GameResults.gameSessionId,
      otherPlayerSocketId: GameResults.opponentData.socketId,
      otherPlayerUserId: GameResults.opponentData.id,
    });

    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Rematch requested',
      text2: 'Waiting for opponent to accept',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  const handleRematchAccept = () => {
    console.log('emiting acceptRematch');
    socketService.socket.emit('acceptRematch', {
      gameId: GameResults.gameSessionId,
      otherPlayerSocketId: GameResults.opponentData.socketId,
      otherPlayerUserId: GameResults.opponentData.id,
      category: GameResults.category,
    });
  };

  const handleRematchDecline = () => {
    console.log('emiting declineRematch');
    socketService.socket.emit('declineRematch', {
      gameId: GameResults.gameSessionId,
      otherPlayerSocketId: GameResults.opponentData.socketId,
      otherPlayerUserId: GameResults.opponentData.id,
    });
  };

  return (
    <LinearGradient
      colors={['#EC80B4', '#3F95F2']}
      style={{
        height: '100%',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <RematchModal
          modalVisible={rematchModalVisible}
          setModalVisible={setRematchModalVisible}
          handleRematchAccept={handleRematchAccept}
          handleRematchDecline={handleRematchDecline}
          otherPlayer={GameResults.opponentData.username}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 80,
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
            }}
          ></View>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 30,
              textAlign: 'center',
              fontFamily: 'poppins-semiBold',
            }}
          >
            Result
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Categories' }],
              });
            }}
          >
            <Ionicons name='close' size={24} color='white' />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            flex: 1,
            marginTop: 20,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            width: '100%',
            height: '100%',
            paddingVertical: 20,
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              height: '100%',
            }}
          >
            <View>
              <TryAgain didWin={GameResults?.yourData?.didWin} />
            </View>
            <Animated.View
              style={[
                {
                  marginTop: 20,
                  alignItems: 'center',
                },
                animatedStyle,
              ]}
            >
              <PlayerCards
                yourData={GameResults.yourData}
                opponentData={GameResults.opponentData}
              />
            </Animated.View>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
              }}
            >
              <Exp />
            </View>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
              }}
            >
              <ScoreCard
                player1={GameResults?.yourData?.username}
                player2={GameResults?.opponentData?.username}
                scores1={GameResults?.yourData?.gameData?.scores?.map((v) => v.points)}
                scores2={GameResults?.opponentData?.gameData?.scores?.map((v) => v.points)}
                categoryName={GameResults?.category}
                handleRematch={handleRematch}
              />
            </View>
            <View
              style={{
                marginTop: 30,
                alignItems: 'center',
              }}
            >
              <Questions
                questions={GameResults.rounds.map((roundData, index) => {
                  const yourAnswers = GameResults.playersRoundData.find(
                    (player) => player.name === GameResults.yourData.username,
                  );

                  const opponentAnswers = GameResults.playersRoundData.find(
                    (player) => player.name === GameResults.opponentData.username,
                  );

                  return {
                    Question: roundData.questionText,
                    QuestionId: roundData.questionId,
                    Answers: roundData.options,
                    CorrectAnswer: roundData.correctAnswer,
                    QuestionImage: roundData.helperImage,
                    PlayerAnswers: {
                      you: {
                        playerName: GameResults.yourData.username,
                        answer: yourAnswers.answers[index].answer,
                        playerAvatar: GameResults.yourData.avatar,
                      },
                      opponent: {
                        playerName: GameResults.opponentData.username,
                        answer: opponentAnswers.answers[index].answer,
                        playerAvatar: GameResults.opponentData.avatar,
                      },
                    },
                  };
                })}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
