import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export default function PlayerCards() {
  const renderPlayerCard = () => {
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
            uri: 'https://i.ytimg.com/vi/V24RwC2o_KE/maxresdefault.jpg',
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
            }}
          >
            Alex Smith
          </Text>
          <CountryFlag isoCode='us' size={12} />
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
            1200
          </Text>
          <Feather name='trending-up' size={12} color='red' />
          <Text
            style={{
              fontFamily: 'poppins-semiBold',
              color: 'red',
              fontSize: 13,
            }}
          >
            +40
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
          {renderPlayerCard()}
          {renderPlayerCard()}
        </View>
      </ImageBackground>
    </View>
  );
}
