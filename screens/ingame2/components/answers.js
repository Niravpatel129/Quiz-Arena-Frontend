import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Answers({ answers }) {
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [answers]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const renderButton = ({ text, answerCorrect }) => {
    let isCorrect = selectedAnswer ? answerCorrect : null;

    let buttonColor = '#EFF8FF';
    let buttonShadowColor = '#CBD9F0';
    let textColor = '#262625';

    if (isCorrect === false) {
      buttonColor = '#FF5858';
      buttonShadowColor = '#F73535';
      textColor = '#ffffff';
    }

    if (isCorrect === true) {
      buttonColor = '#00C48C';
      buttonShadowColor = '#00C48C';
      textColor = '#ffffff';
    }

    return (
      <TouchableOpacity
        onPress={() => {
          handleAnswer(text);
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
        {answers.map((answer, index) => {
          return (
            <React.Fragment key={index}>
              {renderButton({
                text: answer.optionText,
                answerCorrect: answer.isCorrect,
              })}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}
