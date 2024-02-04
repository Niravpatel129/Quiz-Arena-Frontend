import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSound } from '../../../context/sound/SoundContext';
import CustomButton from './CustomButton';

const AnswersBody = ({ question, onAnswer, continueGame, setGameOver }) => {
  const [userSelected, setUserSelected] = React.useState(null);
  const [gameState, setGameState] = React.useState('active');
  const [isSelected, setIsSelected] = React.useState({});
  const [wasCorrect, setWasCorrect] = React.useState(false);
  const soundContext = useSound();

  const handleContinueGame = () => {
    // check if we have a selected answer
    if (!userSelected) return;

    let wasUserCorrect =
      question.answers.find((answer) => answer.isCorrect).optionText === userSelected;
    setWasCorrect(wasUserCorrect);

    if (wasUserCorrect && gameState === 'active') {
      soundContext.playSound('solo_correct');
    }

    if (wasUserCorrect === false && gameState === 'active') {
      soundContext.playSound('solo_fail');
    }

    if (gameState === 'active') {
      // submit answer
      onAnswer(userSelected);
      setGameState('answer-submitted');
    }

    if (gameState === 'answer-submitted') {
      if (!wasCorrect) setGameOver(true);

      // restart game
      continueGame();
      setGameState('active');
    }
  };

  React.useEffect(() => {
    setUserSelected(null);
  }, [question]);

  const renderAnswersBody = ({ answer }) => {
    let textColor = 'black';
    const didUserPickCorrectAnswer = answer.isCorrect && userSelected === answer.optionText;
    let buttonVariant = 'alternative';
    // gameState === 'active' ? 'alternative' : didUserPickCorrectAnswer ? 'default' : 'alternative';

    if (gameState === 'active') {
      buttonVariant = 'alternative';
    }

    if (
      gameState === 'answer-submitted' &&
      answer.isCorrect &&
      userSelected === answer.optionText
    ) {
      textColor = 'white';
      buttonVariant = 'default';
    }

    if (
      gameState === 'answer-submitted' &&
      userSelected === answer.optionText &&
      !answer.isCorrect
    ) {
      textColor = 'white';
      buttonVariant = 'danger';
    }

    return (
      <CustomButton
        title={answer.optionText}
        variant={buttonVariant}
        setIsSelected={() => {
          setIsSelected({ [answer.optionText]: true });
        }}
        isSelected={isSelected[answer.optionText]}
        onPress={() => {
          setUserSelected(answer.optionText);
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text
            style={{
              color: textColor,
              fontSize: RFValue(16),
              fontWeight: 'bold',
              fontFamily: 'poppins-regular',
            }}
          >
            {answer.optionText}
          </Text>
          {gameState === 'answer-submitted' && (
            <Text
              style={{
                color: textColor,
                fontSize: RFValue(16),
                fontWeight: 'bold',
                fontFamily: 'poppins-regular',
              }}
            >
              {answer.pickPercentage}
            </Text>
          )}
        </View>
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
        <CustomButton
          variant={
            {
              active: 'customPink',
              'answer-submitted': 'default',
            }[gameState]
          }
          onPress={() => handleContinueGame()}
        >
          <Text
            style={{
              color: 'white',
              fontSize: RFValue(16),
              fontWeight: 'bold',
              fontFamily: 'poppins-regular',
            }}
          >
            {
              {
                active: 'Submit Answer',
                'answer-submitted': wasCorrect ? 'Continue' : 'Try Again',
              }[gameState]
            }
          </Text>
        </CustomButton>
      </View>
    </View>
  );
};

export default AnswersBody;
