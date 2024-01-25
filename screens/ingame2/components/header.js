import React from 'react';
import { Image, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import TubeFillComponent from './TubeFillComponent';

export default function Header({ timeRemaining, yourData, opponentData }) {
  const renderPlayCard = ({ isOpponent }) => {
    const progressBar = isOpponent ? opponentData?.score : yourData?.score;

    return (
      <View
        style={{
          flexDirection: isOpponent ? 'row-reverse' : 'row',
          gap: 3,
        }}
      >
        <Image
          source={{
            uri: isOpponent ? opponentData?.avatar : yourData?.avatar,
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: isOpponent ? '#FF5858' : '#2CC672',
          }}
        ></Image>
        <View
          style={{
            alignItems: isOpponent ? 'flex-end' : 'flex-start',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'poppins-semiBold',
              fontSize: RFValue(12),
            }}
          >
            {isOpponent ? opponentData?.username : yourData?.username}
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'poppins-regular',
              fontSize: RFValue(10),
            }}
          >
            {isOpponent ? opponentData?.elo : yourData?.elo} Rating
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'poppins-semiBold',
              fontSize: RFValue(13),
            }}
          >
            {isOpponent ? opponentData?.score : yourData?.score}
          </Text>
          <View
            style={{
              transform: [{ rotate: isOpponent ? '180deg' : '0deg' }],
            }}
          >
            <TubeFillComponent
              fillPercentage={progressBar}
              color={isOpponent ? '#FF5858' : '#2CC672'}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: '#3F95F2',
        width: '100%',
        borderRadius: 20,
        paddingVertical: 12,
        shadowColor: '#6A80CF',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          {renderPlayCard({
            isOpponent: false,
          })}
        </View>
        <View
          style={{
            borderRadius: 100,
            borderWidth: 2,
            borderColor: 'white',
            padding: 5,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'poppins-semiBold',
              fontSize: RFValue(10),
              color: 'white',
            }}
          >
            {timeRemaining}
          </Text>
        </View>
        <View>
          {renderPlayCard({
            isOpponent: true,
          })}
        </View>
      </View>
    </View>
  );
}
