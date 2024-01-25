import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Question() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8D2E6',
        padding: 20,
        borderRadius: 20,
        marginTop: 10,
      }}
    >
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: RFValue(14),
          textAlign: 'center',
          color: '#262625',
        }}
      >
        Which country does this flag belong to?
      </Text>
      <Image
        contentFit='contain'
        source={{
          uri: 'https://www.worldatlas.com/r/w1200/img/flag/ca-flag.jpg',
        }}
        style={{
          marginTop: 10,
          width: 150,
          height: 100,
        }}
      />
    </View>
  );
}
