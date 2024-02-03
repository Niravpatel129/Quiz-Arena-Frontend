import React, { useEffect } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import useFeederGameMode from '../../hooks/useFeederGameMode';
import MainGame from './components/MainGame';

const FeederScreen = () => {
  const {
    questions,
    currentQuestionIndex,
    score,
    gameActive,
    startGame,
    answerQuestion,
    showPickPercentage,
    continueGame,
  } = useFeederGameMode();

  useEffect(() => {
    // start game on mount
    startGame();
  }, []);

  const renderGameState = () => {
    if (!gameActive) {
      return (
        <View>
          <Text>Welcome to the Feeder Game!</Text>
          <Button title='Start Game' onPress={startGame} />
        </View>
      );
    } else if (currentQuestionIndex >= questions.length) {
      return (
        <View>
          <Text>Game Over!</Text>
          <Text>Your Score: {score}</Text>
          <Button title='Restart Game' onPress={startGame} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: '100%',
          }}
        >
          <MainGame
            question={questions[currentQuestionIndex]}
            onAnswer={answerQuestion}
            showPickPercentage={showPickPercentage}
            continueGame={continueGame}
          />
        </View>
      );
    }
  };

  return (
    <View
      style={{
        margin: 10,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {renderGameState()}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FeederScreen;
