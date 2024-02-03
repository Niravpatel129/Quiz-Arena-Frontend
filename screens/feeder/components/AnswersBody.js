import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from './CustomButton';

const AnswersBody = ({ question, onAnswer, continueGame }) => {
  const [userSelected, setUserSelected] = React.useState(null);
  const [gameState, setGameState] = React.useState('active');

  const handleContinueGame = () => {
    if (gameState === 'active') {
      // submit answer
      onAnswer(userSelected);
      setGameState('answer-submitted');
    }

    if (gameState === 'answer-submitted') {
      // restart game
      continueGame();
      setGameState('active');
    }
  };

  React.useEffect(() => {
    setUserSelected(null);
  }, [question]);

  const renderAnswersBody = ({ answer }) => {
    console.log('🚀  answer:', answer);
    const didUserPickCorrectAnswer = answer.isCorrect && userSelected === answer.optionText;

    return (
      <CustomButton
        title={'Hello World'}
        onPress={() => {
          setUserSelected(answer.optionText);
        }}
      >
        <Text
          style={{
            color: 'black',
            fontSize: RFValue(16),
            fontWeight: 'bold',
            fontFamily: 'poppins-regular',
          }}
        >
          {answer.optionText}
        </Text>
      </CustomButton>
    );
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        gap: 10,
      }}
    >
      {question.answers.map((answer, index) => {
        return <React.Fragment key={index}>{renderAnswersBody({ answer })}</React.Fragment>;
      })}
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomButton variant='default' onPress={() => handleContinueGame()}>
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              fontWeight: 'bold',
            }}
          >
            {
              {
                active: 'Submit Answer',
                'answer-submitted': 'Continue',
              }[gameState]
            }
          </Text>
        </CustomButton>
      </View>
    </View>
  );
};

export default AnswersBody;
