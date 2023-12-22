import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AnswerOptions from '../../components/AnswerOption';
import Header from '../../components/Header';
import Question from '../../components/Question';
import socketService from '../../services/socketService';

const GameScreen = ({
  navigation,
  route: {
    params: { categoryId },
  },
}) => {
  const [countdown, setCountdown] = React.useState(0);
  const [data, setData] = React.useState(null);
  const myData = data?.gameSession?.players?.find(
    (player) => player.socketId === socketService.socket.id,
  );
  const opponentData = data?.gameSession?.players?.find(
    (player) => player.socketId !== socketService.socket.id,
  );

  const startTimer = () => {
    setInterval(() => {
      setCountdown((prevTime) => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    console.log('🚀  socketService:', socketService.socket.id);

    socketService.on('new_round', (data) => {
      console.log('🚀  new_round:', data);
      setCountdown(0);
      setData(data);
    });

    socketService.on('game_over', (results) => {
      console.log('🚀  game_over:', results);
      navigation.navigate('GameOver', {
        results: results,
        gameSession: data,
      });
    });

    socketService.on('answer_result', (data) => {
      console.log('🚀  answer_result:', data);
    });
  }, []);

  const handleAnswer = (answer) => {
    // Construct the data object to be sent
    const resData = {
      sessionId: data.sessionId,
      answer: answer,
    };

    // Emit the event with the data
    socketService.emit('submit_answer', resData);
  };

  return (
    <ScrollView style={styles.container}>
      <Header yourData={myData} opponentData={opponentData} countdown={countdown} />
      <Question text={data?.question} />
      <AnswerOptions helperImage='' answersOptions={data?.options} handleAnswer={handleAnswer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '2rem',
  },
});

export default GameScreen;
