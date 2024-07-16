import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useSound } from "../../../context/sound/SoundContext";
import CustomButton from "./CustomButton";
import AnswerResultModal from "./AnswerResultModal";

const AnswersBody = ({
  question,
  onAnswer,
  continueGame,
  setGameOver,
  timer,
  setTimer,
  showMessage,
}) => {
  const [userSelected, setUserSelected] = useState(null);
  const [gameState, setGameState] = useState("active");
  const [isSelected, setIsSelected] = useState({});
  const [wasCorrect, setWasCorrect] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const soundContext = useSound();

  const [timerStarted, setTimerStarted] = useState(false);
  const [myInterval, setMyInterval] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Shuffle function
  const shuffleArray = (array) => {
    let shuffled = array.slice(); // Create a copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  useEffect(() => {
    setShuffledAnswers(shuffleArray(question.answers));
  }, [question]);

  useEffect(() => {
    if (timer >= 110) {
      setGameOver(true);
      setGameState("answer-submitted");
      clearInterval(myInterval);
    }
  }, [timer]);

  const startTimer = () => {
    if (timerStarted) return;
    setTimerStarted(true);
    const timerInterval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 100);

    setMyInterval(timerInterval);
  };

  useEffect(() => {
    startTimer();

    setTimer(0);

    return () => {
      clearInterval(myInterval);
    };
  }, [question]);

  const handleAnswerSelection = (answer) => {
    setUserSelected(answer.optionText);
    const wasUserCorrect = answer.isCorrect;

    setWasCorrect(wasUserCorrect);
    setModalVisible(true);
    clearInterval(myInterval);

    if (wasUserCorrect) {
      soundContext.playSound("solo_correct");
    } else {
      soundContext.playSound("solo_fail");
    }
    onAnswer(answer.optionText); // Call onAnswer regardless of correctness
  };

  const handleContinue = () => {
    setModalVisible(false);
    continueGame();
  };

  const handleTryAgain = () => {
    setModalVisible(false);
    setGameOver(true);
  };

  const renderAnswersBody = ({ answer }) => {
    let textColor = "black";
    let buttonVariant = "alternative";

    if (userSelected === answer.optionText) {
      if (answer.isCorrect) {
        buttonVariant = "default";
        textColor = "white";
      } else {
        buttonVariant = "danger";
        textColor = "white";
      }
    }

    return (
      <View
        style={{
          width: "48%",
          marginBottom: 10,
          marginHorizontal: "1%",
          position: "relative",
        }}
      >
        <CustomButton
          title={answer.optionText}
          variant={buttonVariant}
          setIsSelected={() => {
            setIsSelected({ [answer.optionText]: true });
          }}
          isSelected={isSelected[answer.optionText]}
          onPress={() => handleAnswerSelection(answer)}
          disabled={userSelected !== null || showMessage} // Disable button after selection
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 80,
              paddingHorizontal: 10,
              textAlign: "center",
              position: "relative",
            }}
          >
            <Text
              style={{
                color: textColor,
                fontSize: 18,
                // answer.optionText.length > 40 ? RFValue(14) : RFValue(16),
                fontWeight: "bold",
                fontFamily: "poppins-regular",
                textAlign: "center",
                flexShrink: 1,
              }}
              adjustsFontSizeToFitWidth={false}
              numberOfLines={3} // test a little more to make sure options look good
            >
              {answer.optionText}
            </Text>
          </View>
        </CustomButton>
      </View>
    );
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {shuffledAnswers.map((answer, index) => (
          <React.Fragment key={index}>
            {renderAnswersBody({ answer })}
          </React.Fragment>
        ))}
      </View>
      <AnswerResultModal
        visible={modalVisible}
        isCorrect={wasCorrect}
        onContinue={handleContinue}
        onTryAgain={handleTryAgain}
      />
    </View>
  );
};

export default AnswersBody;
