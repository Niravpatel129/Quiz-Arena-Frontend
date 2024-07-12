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

  useEffect(() => {
    console.log("question changed");
    setShowMessage(false);
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
          justifyContent: "space-between",
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
      <QuestionBody question={question} />
      <View>
        <AnswersBody
          question={question}
          onAnswer={(answer) => {
            onAnswer(answer);
            setShowMessage(true);
          }}
          continueGame={continueGame}
          setGameOver={setGameOver}
          setTimer={setTimer}
          timer={timer}
          showMessage={showMessage}
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
          <TimeProgressBar currentTime={timer} maxTime={100} />
        )}
      </View>
      <BonusOptionButton
        onFiftyFifty={() => console.log("50:50 pressed")}
        onRedo={() => console.log("Swap pressed")}
        onBonusTime={() => console.log("Timer pressed")}
        onHint={() => console.log("Hint pressed")}
      />
    </Animated.View>
  );
}
