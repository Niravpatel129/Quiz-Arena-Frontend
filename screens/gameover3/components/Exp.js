import React from 'react';
import { Image, Text, View } from 'react-native';

export default function Exp() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EFF8FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
      }}
    >
      <Image source={require('../../../assets/star.png')} style={{ width: 50, height: 50 }} />
      <Text
        style={{
          fontFamily: 'poppins-bold',
          fontSize: 28,
          color: '#3F95F2',
        }}
      >
        +7
      </Text>
      <Text
        style={{
          fontFamily: 'poppins-regular',
          fontSize: 28,
          marginLeft: 10,
          color: '#5E6064',
        }}
      >
        Exp
      </Text>
    </View>
  );
}
