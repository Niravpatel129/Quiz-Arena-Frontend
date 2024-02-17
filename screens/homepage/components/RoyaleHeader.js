import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function RoyaleHeader({ triviaTuesdayEnabled }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Royale');
      }}
    >
      <LinearGradient
        colors={['#FFA07A', '#FF6347']}
        style={{
          padding: 10,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          paddingVertical: 20,
        }}
      >
        <Text
          style={{
            color: '#ffffff',
            fontSize: 30,
            textAlign: 'center',
            fontFamily: 'poppins-semiBold',
          }}
        >
          Royale Trivia Tuesday
        </Text>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 15,
            textAlign: 'center',
            fontFamily: 'poppins-semiBold',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Opens at 8:00 PM
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
