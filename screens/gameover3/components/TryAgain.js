import React from 'react';
import { Image, Text, View } from 'react-native';

export default function TryAgain({ didWin }) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View>
        <Image
          source={require('../../../assets/smiley_face.png')}
          style={{
            width: 100,
            height: 100,
            marginBottom: 10,
            transform: [{ rotate: didWin ? '0deg' : '180deg' }],
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 26,
          color: '#181A17',
        }}
      >
        {didWin ? 'Yay! You won.' : 'Ops! You lost.'}
      </Text>
    </View>
  );
}
