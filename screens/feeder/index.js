import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import useFeederGameMode from '../../hooks/useFeederGameMode';
import FeederHome from './components/FeederHome';
import GameOver from './components/GameOver';
import MainGame from './components/MainGame';
import Transition from './components/Transition';

const FeederScreen = ({ route }) => {
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
    gameOver,
    setGameOver,
  } = useFeederGameMode(route.params?.categoryId?.replace(/-/g, ' '));
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
            `${
              caluclateQuestionAnswerRatio || Math.floor(Math.random() * (99 - 1 + 1)) + 1
            }% of the players have gotten this correct!`,
          ]}
        />
      );
    }

    if (gameOver) {
      return <GameOver score={score} handleStartGame={handleStartGame} results={results} />;
    }

    return (
      <MainGame
        categoryName={route.params?.categoryName}
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
    <SafeAreaView
      style={{
        height: '100%',
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        style={{
          height: '100%',
        }}
      >
        {renderGameState()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeederScreen;
