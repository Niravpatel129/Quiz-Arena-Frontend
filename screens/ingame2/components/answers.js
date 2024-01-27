import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSound } from '../../../context/sound/SoundContext';
import socketService from '../../../services/socketService';

export default function Answers({ answers, sessionId, timeRemaining }) {
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [randomziedAnswers, setRandomizedAnswers] = React.useState([]);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const { playSound } = useSound();

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);

    const randomizedAnswers = answers.sort(() => Math.random() - 0.5);
    setRandomizedAnswers(randomizedAnswers);
  }, [answers]);

  const handleAnswer = (answer, isCorrect) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    // Backend
    const resData = {
      sessionId: sessionId,
      answer: answer,
      timeRemaining: timeRemaining,
    };

    // check if answer is correct or not

    if (isCorrect) {
      playSound('correct_answer');
    } else {
      playSound('button_press');
    }

    // Emit the event with the data
    socketService.emit('submit_answer', resData);
  };

  const getButtonStyles = (text, answerCorrect) => {
    let buttonColor = '#EFF8FF';
    let buttonShadowColor = '#CBD9F0';
    let textColor = '#262625';

    if (isAnswered) {
      if (answerCorrect) {
        buttonColor = '#00C48C';
        buttonShadowColor = '#00C48C';
        textColor = '#ffffff';
      } else if (selectedAnswer === text) {
        buttonColor = '#FF5858';
        buttonShadowColor = '#F73535';
        textColor = '#ffffff';
      }
    } else if (selectedAnswer === text) {
      buttonColor = answerCorrect ? '#00C48C' : '#FF5858';
      buttonShadowColor = answerCorrect ? '#00C48C' : '#F73535';
      textColor = '#ffffff';
    }

    return { buttonColor, buttonShadowColor, textColor };
  };

  const renderButton = ({ text, answerCorrect }) => {
    const { buttonColor, buttonShadowColor, textColor } = getButtonStyles(text, answerCorrect);

    return (
      <TouchableOpacity
        onPress={() => {
          if (!isAnswered) {
            handleAnswer(text, answerCorrect);
          }
        }}
        style={{
          backgroundColor: buttonColor,
          width: '100%',
          padding: 20,
          borderRadius: 100,
        }}
      >
        <Text
          style={{
            color: textColor,
            fontFamily: 'poppins-regular',
            fontSize: RFValue(11),
            shadowColor: buttonShadowColor,
            shadowOffset: {
              width: 0,
              height: -6,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          {text || 'USA'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text
        style={{
          color: '#5E6064',
          fontFamily: 'poppins-regular',
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        Question Answer
      </Text>

      <View
        style={{
          gap: 10,
        }}
      >
        {randomziedAnswers.map((answer, index) => (
          <React.Fragment key={index}>
            {renderButton({
              text: answer.optionText,
              answerCorrect: answer.isCorrect,
            })}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}
