import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function InGame() {
  const PlayerCard = ({ flipped }) => {
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
          source={{
            uri: 'https://t3.ftcdn.net/jpg/05/56/38/38/360_F_556383860_pVMr2MpKfOPa2tQZiysUatpqhWm6AXaB.jpg',
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: !flipped ? 'start' : 'end',
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter-Black',
              fontSize: 16,
              color: '#fff',
            }}
          >
            Alex
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: 12,
              color: '#19B0FF',
            }}
          >
            1300 ELO
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontFamily: 'Inter-Black',
              color: '#F6CD2E',
              fontSize: 20,
            }}
          >
            109
          </Text>
        </View>
      </View>
    );
  };

  const renderAnswerBubble = () => {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          height: 55,
          borderRadius: 10,
          backgroundColor: 'rgba(50, 84, 122, 0.42)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: 600,
            color: '#fff',
            fontSize: 18,
          }}
        >
          Bad Blood
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
        {renderAnswerBubble()}
        {renderAnswerBubble()}
        {renderAnswerBubble()}
        {renderAnswerBubble()}
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
          What was Taylor Swift's first song?
        </Text>

        <Image
          style={{
            width: 230,
            height: 230,
            borderRadius: 20,
            marginVertical: 20,
          }}
          source={{
            uri: 'https://s.abcnews.com/images/GMA/taylor-swift-singer-ap-mz-05-230317_1679057739039_hpMain_4x5_608.jpg',
          }}
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
              {PlayerCard({ flipped: false })}
              <View
                style={{
                  borderRadius: 50,
                  padding: 5,
                  backgroundColor: '#1A2545',
                  borderWidth: 2,
                  borderColor: '#6EF62E',
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontWeight: 600,
                    fontSize: 24,
                    color: '#fff',
                  }}
                >
                  4
                </Text>
              </View>
              {PlayerCard({ flipped: true })}
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
}
