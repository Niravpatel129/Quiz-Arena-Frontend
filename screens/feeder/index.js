import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import useFeederGameMode from '../../hooks/useFeederGameMode';
import FeederHome from './components/FeederHome';
import GameOver from './components/GameOver';
import MainGame from './components/MainGame';
import Transition from './components/Transition';

const FeederScreen = ({ route }) => {
  console.log('🚀  route:', route);

  const {
    questions,
    currentQuestionIndex,
    score,
    gameActive,
    startGame,
    answerQuestion,
    showPickPercentage,
    continueGame,
    results,
  } = useFeederGameMode(route.params?.categoryId?.replace(/-/g, ' '));
  const [gameOver, setGameOver] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    if (!gameActive) return;

    setShowCountdown(true); // Show countdown first
    setTimeout(() => {
      setShowCountdown(false);
    }, 1000); // Adjust this duration according to your countdown length
  }, [currentQuestionIndex, gameActive]);

  const handleStartGame = () => {
    startGame();
    setGameOver(false);
  };

  if (!gameActive && questions.length === 0) {
    return <FeederHome categoryName={route.params?.categoryName} handleEnter={handleStartGame} />;
  }

  const renderGameState = () => {
    if (showCountdown) {
      if (!questions[currentQuestionIndex]) return;
      const caluclateQuestionAnswerRatio = Math.floor(
        (questions[currentQuestionIndex].stats.correctAnswers /
          questions[currentQuestionIndex].stats.totalAnswers) *
          100,
      );

      return (
        <Transition
          animationText={[
            `Round ${currentQuestionIndex + 1}`,
            `${caluclateQuestionAnswerRatio}% of the players have gotten this correct, good luck!`,
          ]}
        />
      );
    }

    if (gameOver) {
      return <GameOver score={score} handleStartGame={handleStartGame} results={results} />;
    }

    return (
      <MainGame
        score={score}
        question={questions[currentQuestionIndex]}
        onAnswer={answerQuestion}
        showPickPercentage={showPickPercentage}
        continueGame={continueGame}
        setGameOver={setGameOver}
      />
    );
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
