import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AnswerOptions from '../components/AnswerOption';
import Header from '../components/Header';
import Question from '../components/Question';

const triviaGame = {
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

const GameScreen = () => {
  const answerOptions = ['Leonardo da Vinci', 'Van Gogh', 'Gauguin', 'Matisse'];
  return (
    <ScrollView style={styles.container}>
      <Header yourData={triviaGame.you} opponentData={triviaGame.opponent} />
      <Question text='Who painted the Mona Lisa?' />
      <AnswerOptions
        helperImage=''
        answersOptions={[
          {
            text: 'Leonardo da Vinci',
            isCorrect: true,
          },
          {
            text: 'Van Gogh',
            isCorrect: false,
          },
          {
            text: 'Gauguin',
            isCorrect: false,
          },
          {
            text: 'Matisse',
            isCorrect: false,
          },
        ]}
      />
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
