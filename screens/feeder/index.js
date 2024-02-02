import React from 'react';
import { Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
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
    <SafeAreaView>
      <View>
        <Text>Score: {score}</Text>
        <Text>{currentQuestion.question}</Text>
        {currentQuestion.answers.map((answer, index) => {
          return (
            <TouchableOpacity
              key={index}
              title={answer}
              onPress={() => answerQuestion(answer.optionText)}
            >
              <Text>{answer.optionText}</Text>
            </TouchableOpacity>
          );
        })}
        <Button title='Answer' onPress={() => answerQuestion(currentQuestion.correctAnswer)} />
        <Button title='Wrong Answer' onPress={() => answerQuestion('Wrong')} />
      </View>
    </SafeAreaView>
  );
};

export default FeederScreen;
