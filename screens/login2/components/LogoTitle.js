// components/LogoTitle.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export default function LogoTitle() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 50,
          fontWeight: '700',
          color: 'white',
          textAlign: 'center',
          fontFamily: 'Inter-Black',
        }}
      >
        Quiz Arena
      </Text>
      <Ionicons
        style={{
          paddingLeft: 10,
          marginTop: 10,
        }}
        name='book'
        size={40}
        color='white'
      />
    </View>
  );
}
