import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import useFeederGameMode from "../../hooks/useFeederGameMode";
import FeederHome from "./components/FeederHome";
import GameOver from "./components/GameOver";
import MainGame from "./components/MainGame";
import Transition from "./components/Transition";
import { ImageBackground } from "react-native";

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
  } = useFeederGameMode(route.params?.categoryId?.replace(/-/g, " "));
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
    return (
      <FeederHome
        categoryName={route.params?.categoryName}
        handleEnter={handleStartGame}
      />
    );
  }

  const renderGameState = () => {
    if (showCountdown) {
      if (!questions[currentQuestionIndex]) return;
      const calculateQuestionAnswerRatio = Math.floor(
        (questions[currentQuestionIndex].stats.correctAnswers /
          questions[currentQuestionIndex].stats.totalAnswers) *
          100
      );

      return (
        <Transition
          animationText={[
            `Round ${currentQuestionIndex + 1}`,
            `${
              calculateQuestionAnswerRatio ||
              Math.floor(Math.random() * (99 - 1 + 1)) + 1
            }% of the players have gotten this correct!`,
          ]}
        />
      );
    }

    if (gameOver) {
      return (
        <GameOver
          score={score}
          handleStartGame={handleStartGame}
          results={results}
        />
      );
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
    <ImageBackground
      source={require("../../assets/feeder_background_img.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          {renderGameState()}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0B0C1D",
    opacity: 0.8,
  },
  safeArea: {
    height: "100%",
    flex: 1,
  },
  scrollView: {
    height: "100%",
  },
  scrollViewContent: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FeederScreen;
