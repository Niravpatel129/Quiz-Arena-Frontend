import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export default function PlayerCards({ yourData, opponentData }) {
  const renderPlayerCard = ({ playerData }) => {
    console.log('🚀  playerData:', playerData);

    return (
      <View
        style={{
          justifyContent: 'center',
          height: '100%',
          alignItems: 'center',
        }}
      >
        <Image
          source={{
            uri: playerData?.avatar || 'https://i.ytimg.com/vi/V24RwC2o_KE/maxresdefault.jpg',
          }}
          style={{
            borderWidth: 1,
            borderColor: '#C0E1FD',
            borderRadius: 10,
            width: 80,
            height: 80,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Text
            style={{
              fontFamily: 'poppins-semiBold',
              color: '#fff',
              fontSize: 14,
              textTransform: 'capitalize',
            }}
          >
            {playerData?.username}
          </Text>
          {playerData?.country && <CountryFlag isoCode={playerData?.country} size={12} />}
        </View>
        <View
          style={{
            marginTop: 10,
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: '#EFF8FF',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Ionicons name='trophy' size={24} color='gold' />
          <Text
            style={{
              color: '#3F95F2',
              fontSize: 13,
              fontFamily: 'poppins-semiBold',
            }}
          >
            {playerData?.rating}
          </Text>
          <Feather
            name={playerData?.didWin ? 'trending-up' : 'trending-down'}
            size={12}
            color={playerData?.didWin ? '#2CC672' : '#FF5858'}
          />
          <Text
            style={{
              fontFamily: 'poppins-semiBold',
              color: playerData?.didWin ? '#2CC672' : '#FF5858',
              fontSize: 13,
            }}
          >
            {Math.abs(playerData?.ratingChange)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      <ImageBackground
        source={require('../../../assets/cards.png')}
        style={{
          width: '100%',
          height: 220,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}
        >
          {renderPlayerCard({ playerData: yourData })}
          {renderPlayerCard({ playerData: opponentData })}
        </View>
      </ImageBackground>
    </View>
  );
}
