import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import useFeederGameMode from '../../hooks/useFeederGameMode';
import FeederHome from './components/FeederHome';
import GameOver from './components/GameOver';
import MainGame from './components/MainGame';
import Transition from './components/Transition';

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
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    console.log('🚀  currentQuestionIndex:', currentQuestionIndex);
    console.log('🚀  gameActive:', gameActive);
    if (!gameActive) return;

    setShowCountdown(true); // Show countdown first
    setTimeout(() => {
      setShowCountdown(false);
    }, 2500); // Adjust this duration according to your countdown length
  }, [currentQuestionIndex, gameActive]);

  const handleStartGame = () => {
    startGame();
    setGameOver(false);
  };

  const renderGameState = () => {
    if (showCountdown) {
      if (!questions[currentQuestionIndex]) return;
      console.log('🚀  questions[currentQuestionIndex]:', questions[currentQuestionIndex]);
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
      return <GameOver score={score} handleStartGame={handleStartGame} />;
    }

    if (!gameActive && questions.length === 0) {
      return <FeederHome handleEnter={handleStartGame} />;
    } else {
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
