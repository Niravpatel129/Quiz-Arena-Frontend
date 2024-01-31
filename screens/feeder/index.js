import React from 'react';
import { Button, Text, View } from 'react-native';
import useFeederGameMode from '../../hooks/useFeederGameMode';

const FeederScreen = () => {
  const { questions, currentQuestionIndex, score, gameActive, startGame, answerQuestion } =
    useFeederGameMode();

  if (!gameActive) {
    return (
      <View>
        <Text>Game Over! Your score: {score}</Text>
        <Button title='Start Game' onPress={startGame} />
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <Text>Loading...</Text>;
  }

  console.log('🚀  currentQuestion:', currentQuestion);

  return (
    <View>
      <Text>Score: {score}</Text>
      <Text>{currentQuestion.question}</Text>
      <Button title='Answer' onPress={() => answerQuestion(currentQuestion.correctAnswer)} />
      <Button title='Wrong Answer' onPress={() => answerQuestion('Wrong')} />
    </View>
  );
};

export default FeederScreen;
