import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter';

export default function RenderKing({ currentFeederKing }) {
  console.log('🚀  currentFeederKing:', currentFeederKing);
  return (
    <View
      style={{
        margin: 20,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 20,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        Current Feeder King
      </Text>
      <Image
        source={{
          uri: currentFeederKing.user.profile.avatar,
        }}
        style={{
          width: 100,
          height: 100,
          marginBottom: 10,
        }}
      />

      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 20,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        {capitalizeFirstLetter(currentFeederKing.user.username)}
        <CountryFlag
          style={{
            marginLeft: 6,
          }}
          isoCode={currentFeederKing.user.profile.country}
          size={17}
        />
      </Text>
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 20,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        {currentFeederKing.scoreAchieved} Feed Score
      </Text>
    </View>
  );
}
