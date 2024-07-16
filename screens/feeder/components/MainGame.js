import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AnswersBody from "./AnswersBody";
import QuestionBody from "./QuestionBody";
import QuestionHeader from "./QuestionHeader";
import TimeProgressBar from "./TimeProgressBar";
import BonusOptionButton from "./BonusOptionButton";

export default function MainGame({
  question,
  onAnswer,
  continueGame,
  score,
  setGameOver,
  categoryName,
}) {
  const opacity = useSharedValue(0);
  const [timer, setTimer] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [removeTwoIncorrectAnswers, setRemoveTwoIncorrectAnswers] =
    useState(false);
  const [allowRedo, setAllowRedo] = useState(false);
  const [activeOption, setActiveOption] = useState(null); // Track active option
  const [timerInterval, setTimerInterval] = useState(null); // Keep track of timer interval
  const [redoMessage, setRedoMessage] = useState(
    "You have 2 chances to pick the correct option!"
  ); // Message for redo option
  const [hintActive, setHintActive] = useState(false); // Track if hint is active

  useEffect(() => {
    console.log("question changed");
    setShowMessage(false);
    setRemoveTwoIncorrectAnswers(false); // Reset 50/50 option for new question
    setAllowRedo(false); // Reset Redo option for new question
    setActiveOption(null); // Reset active option for new question
    setRedoMessage("You have 2 chances to pick the correct option!"); // Reset message for new question
    setHintActive(false); // Reset hint active state for new question
  }, [question]);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleContinue = () => {
    setShowMessage(false);
    continueGame();
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 100);
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(0);
    startTimer();
  };

  const handleFiftyFifty = () => {
    if (activeOption) return; // Prevent multiple options at the same time
    stopTimer();
    setActiveOption("50/50");
    console.log("50:50 pressed");
    setRemoveTwoIncorrectAnswers(true); // Trigger 50/50 option
  };

  const handleRedo = () => {
    if (activeOption) return; // Prevent multiple options at the same time
    stopTimer();
    setActiveOption("Redo");
    setAllowRedo(true); // Allow user to select two answers
    console.log("Redo pressed");
  };

  const handleBonusTime = () => {
    if (activeOption) return; // Prevent multiple options at the same time
    resetTimer();
    setActiveOption("BonusTime");
    console.log("Bonus time pressed");
  };

  const handleHint = () => {
    if (activeOption) return; // Prevent multiple options at the same time
    stopTimer();
    setActiveOption("Hint");
    setHintActive(true); // Activate hint
    console.log("Hint pressed");
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [question]);

  if (!question) {
    return (
      <View
        style={{
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <ActivityIndicator size='large' color='#000' /> */}
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        {
          justifyContent: "flex-start",
          padding: 10,
          width: "100%",
          height: "100%",
        },
        animatedStyle,
      ]}
    >
      <View
        style={{
          height: 70,
        }}
      >
        <QuestionHeader
          score={score + 1}
          question={question}
          categoryName={categoryName}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <QuestionBody question={question} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <AnswersBody
          question={question}
          onAnswer={(answer) => {
            onAnswer(answer);
            setShowMessage(true);
            setAllowRedo(false); // Disable Redo after answer
            setHintActive(false); // Disable hint after answer
            setActiveOption(null); // Reset active option after answer
          }}
          continueGame={continueGame}
          setGameOver={setGameOver}
          setTimer={setTimer}
          timer={timer}
          showMessage={showMessage}
          removeTwoIncorrectAnswers={removeTwoIncorrectAnswers} // Pass prop
          allowRedo={allowRedo} // Pass allowRedo prop
          setRedoMessage={setRedoMessage} // Pass setRedoMessage function
          redoMessage={redoMessage} // Pass redoMessage state
          hintActive={hintActive} // Pass hintActive state
        />
        {showMessage ? (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: -5,
              backgroundColor: "transparent",
              borderRadius: 10,
            }}
            onPress={handleContinue}
          >
            <Text
              style={{
                fontStyle: "italic",
                color: "white",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              --Tap anywhere on screen to continue--
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <TimeProgressBar currentTime={timer} maxTime={100} />
          </View>
        )}
      </View>
      <View
        style={{
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <BonusOptionButton
          onFiftyFifty={handleFiftyFifty}
          onRedo={handleRedo}
          onBonusTime={handleBonusTime}
          onHint={handleHint}
        />
      </View>
    </Animated.View>
  );
}
