import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import Scorebar from '../../components/Scorebar/Scorebar';
import { useSound } from '../../context/sound/SoundContext';
import shuffle from '../../helpers/shuffle';
import socketService from '../../services/socketService';

function clockBorderColor(clock) {
  let greenStart = 246;
  let red = Math.floor(110 + 145 * (1 - clock / 12)); // 110 is the starting red value, 255-110=145 is the range
  let green = Math.floor(greenStart * (clock / 12));

  let borderColor = `rgb(${red}, ${green}, 0)`;

  return borderColor;
}

const baseTime = 12;
const calculateTimeBasedScore = (timeRemaining) => {
  return Math.floor(20 - Math.floor(baseTime - timeRemaining));
};

const PlayerCard = ({ player, flipped }) => {
  return (
    <View
      style={{
        flexDirection: !flipped ? 'row' : 'row-reverse',
        gap: 4,
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: '#516696',
        }}
        source={{
          uri: player.avatar,
          headers: {
            Accept: '*/*',
          },
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: !flipped ? 'flex-start' : 'flex-end',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {flipped && (
            <CountryFlag
              isoCode={player.country || 'aq'}
              size={16}
              style={{ marginHorizontal: 5 }}
            />
          )}

          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              fontSize: 13,
              color: '#fff',
              maxWidth: 100,
            }}
          >
            {player.username}
          </Text>
          {!flipped && (
            <CountryFlag
              isoCode={player.country || 'aq'}
              size={16}
              style={{ marginHorizontal: 5 }}
            />
          )}
        </View>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: 12,
            color: '#19B0FF',
          }}
        >
          {player.elo || 1200} ELO
        </Text>
        <Text
          style={{
            marginTop: 4,
            fontFamily: 'Inter-Black',
            color: '#F6CD2E',
            fontSize: 20,
          }}
        >
          {player.score}
        </Text>
      </View>
    </View>
  );
};

const InGame = ({ InGameData, timer, roundNumber }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedForRound, setSelectedForRound] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { playSound } = useSound();

  useEffect(() => {
    // Shuffle the answers
    setShuffledAnswers(shuffle(InGameData.RoundData.answers));
  }, [InGameData.RoundData.answers]);

  useEffect(() => {
    setSelectedAnswer(null);
    setSelectedForRound(false);
    setImageLoaded(false);
  }, [roundNumber]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    handleAnswer(answer);
    setSelectedForRound(true);
  };

  const renderAnswerBubble = (answer) => {
    let backgroundColor = 'rgba(50, 84, 122, 0.42)';

    if (answer.optionText === selectedAnswer) {
      backgroundColor = answer.isCorrect ? 'rgb(110, 246, 46)' : 'rgb(246, 46, 46)';
    }

    // show the correct answer if selectedForRound is true
    if (selectedForRound && answer.isCorrect) {
      backgroundColor = 'rgb(110, 246, 46)';
    }

    return (
      <AnimatedButton
        key={answer.optionText}
        style={{
          width: '100%',
          height: 55,
          borderRadius: 10,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          if (!selectedForRound) handleAnswerSelection(answer.optionText);
        }}
        number={selectedForRound && answer.isCorrect ? calculateTimeBasedScore(timer) : 0}
      >
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: '600',
            color: '#fff',
            fontSize: 18,
          }}
        >
          {answer.optionText}
        </Text>
      </AnimatedButton>
    );
  };

  const renderAnswerBubbles = () => {
    return (
      <Animated.View
        style={{
          flexWrap: 'wrap',
          flex: 1,
          gap: 20,
        }}
      >
        {<>{shuffledAnswers.map((answer) => renderAnswerBubble(answer))}</>}
      </Animated.View>
    );
  };

  const renderQuestion = () => {
    if (!InGameData.RoundData?.question) return null;

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
          marginBottom: 0,
          height: 350,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            letterSpacing: 0.5,
            fontSize: !InGameData.RoundData?.image
              ? 25
              : InGameData.RoundData?.question?.split(' ').length > 6
              ? 20
              : 22,
            width: '80%',
            color: '#fff',
            minHeight: 100,
            marginTop: 20,
          }}
        >
          {InGameData.RoundData.question}
        </Text>
        {InGameData?.RoundData?.image && (
          <Image
            resizeMode='contain'
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
              marginTop: 1,
              marginBottom: 20,
            }}
            onLoad={() => setImageLoaded(true)}
            source={{
              uri: InGameData?.RoundData?.image,
              headers: {
                Accept: '*/*',
              },
            }}
          />
        )}
      </View>
    );
  };

  const handleAnswer = (answer) => {
    // Construct the data object to be sent
    const resData = {
      sessionId: InGameData.sessionId,
      answer: answer,
      timeRemaining: timer,
    };

    // check if answer is correct or not
    const correctAnswer = InGameData.RoundData.answers.find((a) => a.isCorrect);

    if (answer.toLowerCase() === correctAnswer?.optionText?.toLowerCase()) {
      playSound('correct_answer');
    } else {
      playSound('button_press');
    }

    // Emit the event with the data
    socketService.emit('submit_answer', resData);
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        height: '100%',
      }}
    >
      <SafeAreaView
        style={{
          height: '100%',
        }}
      >
        <ScrollView>
          <View
            style={{
              height: '100%',
            }}
          >
            <View
              style={{
                backgroundColor: '#303E5F',
                marginHorizontal: 5,
                marginVertical: 5,
                borderRadius: 20,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <PlayerCard player={InGameData.PlayerOneInformation} flipped={false} />
                <View
                  style={{
                    borderRadius: 50,
                    padding: 5,
                    backgroundColor: '#1A2545',
                    borderWidth: 2,
                    borderColor: clockBorderColor(timer),
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontWeight: '600',
                      fontSize: 21,
                      color: '#fff',
                    }}
                  >
                    {timer < 1 ? `⏰` : timer}
                  </Text>
                </View>
                <PlayerCard player={InGameData.PlayerTwoInformation} flipped={true} />
              </View>
            </View>

            <View>
              <View>{renderQuestion()}</View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  gap: 20,
                }}
              >
                <Scorebar score={InGameData.PlayerOneInformation.score} color='#AAFF00' />
                {renderAnswerBubbles()}
                <Scorebar score={InGameData.PlayerTwoInformation.score} color='red' />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default InGame;
