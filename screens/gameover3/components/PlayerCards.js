import React from 'react';
import { Image, Text, View } from 'react-native';

export default function PlayerCards() {
  return (
    <View
      style={{
        backgroundColor: 'red',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text>Player 1</Text>
      <Image
        source={require('../../../assets/Versus.png')}
        style={{
          width: 100,
          height: 100,
        }}
      />
      <Text>Player 2</Text>
    </View>
  );
}
