import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Question({ question, questionImage }) {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8D2E6',
        padding: 20,
        height: '100%',
        borderRadius: 20,
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
        {question || 'Which country does this flag belong to?'}
      </Text>
      {questionImage && (
        <Image
          contentFit='contain'
          source={{
            uri: questionImage || 'https://www.worldatlas.com/r/w1200/img/flag/ca-flag.jpg',
          }}
          style={{
            marginTop: 10,
            width: 150,
            height: 100,
          }}
        />
      )}
    </View>
  );
}
