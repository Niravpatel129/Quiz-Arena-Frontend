import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import useFeederGameMode from '../../hooks/useFeederGameMode';
import FeederHome from './components/FeederHome';
import GameOver from './components/GameOver';
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
  const [gameOver, setGameOver] = useState(false);

  const handleStartGame = () => {
    setGameOver(false);
    startGame();
  };

  const renderGameState = () => {
    if (gameOver) {
      return (
        <View>
          <GameOver score={score} handleStartGame={handleStartGame} />
        </View>
      );
    }

    if (!gameActive && questions.length === 0) {
      return <FeederHome handleEnter={handleStartGame} />;
    } else {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
            // flex: 1,
          }}
        >
          <MainGame
            score={score}
            question={questions[currentQuestionIndex]}
            onAnswer={answerQuestion}
            showPickPercentage={showPickPercentage}
            continueGame={continueGame}
            setGameOver={setGameOver}
          />
        </View>
      );
    }
  };

  return (
    <View
      style={{
        // margin: 10,
        height: '100%',
      }}
    >
      <SafeAreaView
        style={{
          height: '100%',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            // flex: 1,
            width: '100%',
          }}
        >
          {renderGameState()}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FeederScreen;
