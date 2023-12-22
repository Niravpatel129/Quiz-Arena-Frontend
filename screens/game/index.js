import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import socketService from '../../services/socketService';
import AnswerOptions from '../components/AnswerOption';
import Header from '../components/Header';
import Question from '../components/Question';

const fakeGameState = {
  question: 'Who painted the Mona Lisa?',
  options: ['Leonardo da Vinci', 'Van Gogh', 'Gauguin', 'Matisse'],
  you: {
    name: 'Billy',
    avatar: 'your_avatar.png',
    score: 70,
    pointsEarned: 18,
    answer: 'Leonardo da Vinci',
    isCorrect: true,
    responseTime: 5,
  },
  opponent: {
    name: 'Tommy',
    avatar: 'opponent_avatar.png',
    score: 80,
    pointsEarned: 0,
    answer: '',
    isCorrect: false,
    responseTime: 0,
  },
  scoreBar: {
    you: {
      visualScore: '70%',
      visualPoints: '18%',
    },
    opponent: {
      visualScore: '80%',
      visualPoints: '0%',
    },
  },
};

const GameScreen = ({ GameState }) => {
  const [countdown, setCountdown] = React.useState(0);
  const [data, setData] = React.useState(null);

  const startTimer = () => {
    setInterval(() => {
      setCountdown((prevTime) => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    socketService.on('new_round', (data) => {
      console.log('🚀  new_round:', data);
      setCountdown(0);
      setData(data);
    });

    socketService.on('game_over', (data) => {
      console.log('🚀  game_over:', data);
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
      <Header
        yourData={fakeGameState.you}
        opponentData={fakeGameState.opponent}
        countdown={countdown}
      />
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
