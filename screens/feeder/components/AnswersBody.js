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
  removeTwoIncorrectAnswers,
  allowRedo, // New prop for allowing redo
  setRedoMessage, // New prop for setting redo message
  redoMessage, // New prop for redo message state
  hintActive, // New prop for hint active state
}) => {
  const [userSelected, setUserSelected] = useState(null);
  const [secondChance, setSecondChance] = useState(false); // Track if user has a second chance
  const [gameState, setGameState] = useState("active");
  const [isSelected, setIsSelected] = useState({});
  const [wasCorrect, setWasCorrect] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [removedAnswers, setRemovedAnswers] = useState([]);
  const soundContext = useSound();

  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const shuffleArray = (array) => {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
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
    }
  }, [timer]);

  const handleAnswerSelection = (answer) => {
    setUserSelected(answer.optionText);
    const wasUserCorrect = answer.isCorrect;

    if (wasUserCorrect) {
      setWasCorrect(true);
      setModalVisible(true);
      soundContext.playSound("solo_correct");
      onAnswer(answer.optionText);
    } else if (allowRedo && !secondChance) {
      setSecondChance(true); // Allow the user to pick again
      setRedoMessage("You have 1 more chance to pick the correct option!");
      soundContext.playSound("solo_fail");
    } else {
      setWasCorrect(false);
      setModalVisible(true);
      soundContext.playSound("solo_fail");
      onAnswer(answer.optionText);
    }
  };

  const handleContinue = () => {
    setModalVisible(false);
    continueGame();
  };

  const handleTryAgain = () => {
    setModalVisible(false);
    setGameOver(true);
  };

  useEffect(() => {
    if (removeTwoIncorrectAnswers) {
      const incorrectAnswers = shuffledAnswers.filter(
        (answer) => !answer.isCorrect
      );
      const answersToRemove = incorrectAnswers
        .slice(0, 2)
        .map((answer) => answer.optionText);
      setRemovedAnswers(answersToRemove);
    }
  }, [removeTwoIncorrectAnswers, shuffledAnswers]);

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

    if (hintActive && answer.isCorrect) {
      buttonVariant = "default"; // Change background color to highlight correct answer
      textColor = "white"; // Change text color to white for visibility
    }

    return (
      <View
        style={{
          width: "48%",
          marginBottom: 10,
          marginHorizontal: "1%",
          position: "relative",
          opacity: removedAnswers.includes(answer.optionText) ? 0.5 : 1, // Adjust opacity for removed answers
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
          disabled={
            (userSelected !== null && !secondChance) ||
            showMessage ||
            removedAnswers.includes(answer.optionText)
          } // Disable button for removed answers and after selection if no second chance
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
                fontWeight: "bold",
                fontFamily: "poppins-regular",
                textAlign: "center",
                flexShrink: 1,
              }}
              adjustsFontSizeToFitWidth={false}
              numberOfLines={3}
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
      {allowRedo && (
        <Text style={{ color: "white", marginBottom: 10 }}>{redoMessage}</Text>
      )}
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
