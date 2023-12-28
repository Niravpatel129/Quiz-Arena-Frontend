import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const InGameData = {
  PlayerOneInformation: {
    avatar:
      'https://t3.ftcdn.net/jpg/05/56/38/38/360_F_556383860_pVMr2MpKfOPa2tQZiysUatpqhWm6AXaB.jpg',
    username: 'Alex',
    elo: 1300,
    score: 109,
  },
  PlayerTwoInformation: {
    avatar:
      'https://t3.ftcdn.net/jpg/05/56/38/38/360_F_556383860_pVMr2MpKfOPa2tQZiysUatpqhWm6AXaB.jpg',
    username: 'Bob',
    elo: 1400,
    score: 120,
  },
  RoundData: {
    question: 'What was Taylor Swifts first song?',
    image:
      'https://s.abcnews.com/images/GMA/taylor-swift-singer-ap-mz-05-230317_1679057739039_hpMain_4x5_608.jpg',
    answers: ['Bad Blood', 'Shake it Off', 'Love Story', 'Blank Space'],
    correctAnswer: 'Love Story',
  },
};

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

const InGame = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [clock, setClock] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setClock((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswerCorrect(answer === InGameData.RoundData.correctAnswer);
  };

  const renderAnswerBubble = (answer) => {
    let backgroundColor = 'rgba(50, 84, 122, 0.42)'; // default color
    if (answer === selectedAnswer) {
      backgroundColor = isAnswerCorrect ? 'rgb(110, 246, 46)' : 'rgb(246, 46, 46)';
    }

    return (
      <TouchableOpacity
        key={answer}
        style={{
          width: '100%',
          height: 55,
          borderRadius: 10,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleAnswerSelection(answer)}
      >
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: '600',
            color: '#fff',
            fontSize: 18,
          }}
        >
          {answer}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAnswerBubbles = () => {
    return (
      <View
        style={{
          flexWrap: 'wrap',
          flex: 1,
          gap: 20,
        }}
      >
        {InGameData.RoundData.answers.map((answer) => renderAnswerBubble(answer))}
      </View>
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
          }}
          source={{ uri: InGameData.RoundData.image }}
        />
      </View>
    );
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
                  //   borderColor: '#6EF62E',
                  borderColor: clockBorderColor(clock),
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
                  {clock < 1 ? `⏰` : clock}
                </Text>
              </View>
              <PlayerCard player={InGameData.PlayerTwoInformation} flipped={true} />
            </View>
          </View>
          <ScrollView>
            <View>{renderQuestion()}</View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 20,
              }}
            >
              <View
                style={{
                  width: 8,
                  borderRadius: 10,
                  backgroundColor: '#516696',
                }}
              ></View>
              {renderAnswerBubbles()}
              <View
                style={{
                  width: 8,
                  borderRadius: 10,
                  backgroundColor: '#516696',
                }}
              ></View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default InGame;
