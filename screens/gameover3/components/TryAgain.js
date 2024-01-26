import React from 'react';
import { Image, Text, View } from 'react-native';

export default function TryAgain() {
  return (
    <View
      style={{
        flex: 1,
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
        Ops! You lost!
      </Text>
    </View>
  );
}
