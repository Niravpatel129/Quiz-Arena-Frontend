import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import AnswerOptions from '../../components/AnswerOption';
import Header from '../../components/Header';
import HighlightEffect from '../../components/HighlightEffect';
import Question from '../../components/Question';
import QuizAnimation from '../../components/QuizAnimation';
import useConditionalFadeIn from '../../hooks/useConditionalFadeIn';
import socketService from '../../services/socketService';

const GameScreen = ({
  navigation,
  route: {
    params: { categoryId },
  },
}) => {
  const [highlightTrigger, setHighlightTrigger] = React.useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState(false);

  const [countdown, setCountdown] = React.useState(0);
  const [data, setData] = React.useState(null);
  const myData = data?.gameSession?.players?.find(
    (player) => player.socketId === socketService.socket.id,
  );

  const opponentData = data?.gameSession?.players?.find(
    (player) => player.socketId !== socketService.socket.id,
  );
  const [showAnimation, setShowAnimation] = React.useState(true);
  const fadeInOpacity = useConditionalFadeIn(countdown !== 0);

  const startTimer = () => {
    setInterval(() => {
      setCountdown((prevTime) => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    socketService.on('new_round', (roundData) => {
      setCountdown(0);
      if (roundData) setData(roundData);
      setHighlightTrigger(false);
    });

    socketService.on('game_over', (results) => {
      navigation.navigate('GameOver', {
        results: results,
      });
    });

    socketService.on('answer_result', (result) => {
      setData((prevData) => ({
        ...prevData,
        gameSession: {
          ...prevData.gameSession,
          players: prevData.gameSession.players.map((player) => {
            const me = prevData?.gameSession?.players?.find(
              (player) => player.socketId === socketService.socket.id,
            );

            if (player.socketId === me.socketId) {
              return {
                ...player,
                score: result.currentScore,
              };
            }
            return player;
          }),
        },
      }));
    });

    socketService.on('opponent_guessed', (result) => {
      // if correct answer flash the screen green
      // if wrong answer flash the screen red
      console.log('🚀  opponent_guessed:', result.isCorrect);
      setIsCorrectAnswer(result.isCorrect);
      setHighlightTrigger(!highlightTrigger);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => setShowAnimation(false), 3000);
  }, []);

  const handleAnswer = (answer) => {
    // Construct the data object to be sent
    const resData = {
      sessionId: data.sessionId,
      answer: answer,
      timeRemaining: countdown,
    };

    // Emit the event with the data
    socketService.emit('submit_answer', resData);
  };

  return (
    <>
      <QuizAnimation
        isVisible={showAnimation}
        playerOneName={myData?.name}
        playerTwoName={opponentData?.name}
      />
      <HighlightEffect isCorrect={isCorrectAnswer} trigger={highlightTrigger} />

      <View style={styles.container}>
        <Header yourData={myData} opponentData={opponentData} countdown={countdown} />
        <Question text={data?.question} />

        <Animated.View style={{ opacity: fadeInOpacity }}>
          <AnswerOptions
            helperImage=''
            answersOptions={data?.options}
            handleAnswer={handleAnswer}
            scores={{
              yourScore: myData?.score,
              opponentScore: opponentData?.score,
            }}
          />
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '2rem',
  },
});

export default GameScreen;
