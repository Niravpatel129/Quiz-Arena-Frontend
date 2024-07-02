import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSound } from '../../../context/sound/SoundContext';
import CustomButton from './CustomButton';

const AnswersBody = ({ question, onAnswer, continueGame, setGameOver, timer, setTimer }) => {
  const [userSelected, setUserSelected] = React.useState(null);
  const [gameState, setGameState] = React.useState('active');
  const [isSelected, setIsSelected] = React.useState({});
  const [wasCorrect, setWasCorrect] = React.useState(false);
  const soundContext = useSound();

  const [timerStarted, setTimerStarted] = React.useState(false);
  const [myInterval, setMyInterval] = React.useState(null);
  const [shuffledAnswers, setShuffledAnswers] = React.useState([]);

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
      // setGameOver(true);
      setGameState('answer-submitted');
      console.log('🚀  game over');
      // stop the timer
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

  const handleContinueGame = () => {
    // check if we have a selected answer
    if (!userSelected && gameState === 'active') return;

    clearInterval(myInterval);

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
      <View style={{ width: '48%', marginBottom: 10, marginHorizontal: '1%' }}>
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
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%',
            height: 70, 
            paddingHorizontal: 10, 
            textAlign: 'center',
            position: 'relative',
          }}
          >
            <Text
              style={{
                color: textColor,
                fontSize: RFValue(16),
                fontWeight: 'bold',
                fontFamily: 'poppins-regular',
                textAlign: 'center',
                flexShrink: 1,
                flexWrap: 'wrap',
              }}
            >
              {answer.optionText}
            </Text>
            {gameState === 'answer-submitted' && (
              <Text
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  color: textColor,
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                  fontFamily: 'poppins-regular',
                  marginLeft: 5,
                }}
              >
                {answer.pickPercentage}
              </Text>
            )}
          </View>
        </CustomButton>
      </View>
    );
  };
  
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {shuffledAnswers.map((answer, index) => (
          <React.Fragment key={index}>{renderAnswersBody({ answer })}</React.Fragment>
        ))}
      </View>
  
      {/* Continue Button */}
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
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
