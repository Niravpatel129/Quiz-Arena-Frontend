import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Scorebar from '../../components/Scorebar/Scorebar';
import socketService from '../../services/socketService';

function clockBorderColor(clock) {
  let greenStart = 246;
  let red = Math.floor(110 + 145 * (1 - clock / 12)); // 110 is the starting red value, 255-110=145 is the range
  let green = Math.floor(greenStart * (clock / 12));

  let borderColor = `rgb(${red}, ${green}, 0)`;

  return borderColor;
}

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
          width: 70,
          height: 70,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: '#516696',
        }}
        source={{ uri: player.avatar }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: !flipped ? 'flex-start' : 'flex-end',
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter-Black',
            fontSize: 16,
            color: '#fff',
          }}
        >
          {player.username}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: 12,
            color: '#19B0FF',
          }}
        >
          {player.elo} ELO
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
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial value for opacity: 0

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    handleAnswer(answer);
  };

  useEffect(() => {
    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      delay: 1000, // Delay for 1 second
    }).start();
  }, [roundNumber]);

  const renderAnswerBubble = (answer) => {
    let backgroundColor = 'rgba(50, 84, 122, 0.42)';

    if (answer.optionText === selectedAnswer) {
      backgroundColor = answer.isCorrect ? 'rgb(110, 246, 46)' : 'rgb(246, 46, 46)';
    }

    return (
      <TouchableOpacity
        key={answer.optionText}
        style={{
          width: '100%',
          height: 55,
          borderRadius: 10,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleAnswerSelection(answer.optionText)}
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
      </TouchableOpacity>
    );
  };

  const renderAnswerBubbles = () => {
    return (
      <Animated.View
        style={{
          flexWrap: 'wrap',
          flex: 1,
          gap: 20,
          opacity: fadeAnim,
        }}
      >
        {InGameData.RoundData.answers.map((answer) => renderAnswerBubble(answer))}
      </Animated.View>
    );
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          margin: 10,
          marginBottom: 0,
          minHeight: 250,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 38,
            color: '#fff',
          }}
        >
          {InGameData.RoundData.question}
        </Text>

        <Image
          style={{
            width: 230,
            height: 230,
            borderRadius: 20,
            marginVertical: 20,
            objectFit: 'contain',
            resizeMode: 'contain',
          }}
          source={{ uri: InGameData.RoundData.image }}
        />
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
          <ScrollView>
            <View
              style={{
                justifyContent: 'space-between',
              }}
            >
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
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default InGame;
