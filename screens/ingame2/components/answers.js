import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSound } from '../../../context/sound/SoundContext';
import socketService from '../../../services/socketService';
import AnswerButton from './AnswerButton';

export default function Answers({ answers, sessionId, timeRemaining, roundOverData, isClickable }) {
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [randomziedAnswers, setRandomizedAnswers] = React.useState([]);
  const [didPlayerAnswerCorrect, setDidPlayerAnswerCorrect] = React.useState(false);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const { playSound } = useSound();

  useEffect(() => {
    if (roundOverData && didPlayerAnswerCorrect) {
      playSound('correct_answer');
    }

    if (roundOverData && !didPlayerAnswerCorrect) {
      playSound('wrong');
    }

    setDidPlayerAnswerCorrect(false);
  }, [roundOverData]);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);

    const randomizedAnswers = answers.sort(() => Math.random() - 0.5);
    setRandomizedAnswers(randomizedAnswers);
  }, [answers]);

  const handleAnswer = (answer, isCorrect) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const resData = {
      sessionId: sessionId,
      answer: answer,
      timeRemaining: timeRemaining,
    };

    playSound('button_press');

    if (isCorrect) {
      setDidPlayerAnswerCorrect(true);
    }

    // if (isCorrect) {
    //   playSound('correct_answer');
    // } else {
    //   playSound('button_press');
    // }

    socketService.emit('submit_answer', resData);
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
          <AnswerButton
            key={index}
            text={answer.optionText}
            answerCorrect={answer.isCorrect}
            isSelected={selectedAnswer === answer.optionText}
            isAnswered={isAnswered}
            roundOverData={roundOverData}
            onPress={() => {
              if (!isAnswered && isClickable) {
                handleAnswer(answer.optionText, answer.isCorrect);
              }
            }}
          />
        ))}
      </View>
    </View>
  );
}

const calculateTimeBasedScore = (timeRemaining) => {
  const baseTime = 12;

  return Math.floor(20 - Math.floor(baseTime - timeRemaining));
};
