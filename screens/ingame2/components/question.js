import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Question({ question, questionImage, setImageLoaded }) {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8D2E6',
        paddingTop: 10,
        paddingHorizontal: 10,
        height: '100%',
        borderRadius: 20,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: question?.length > 30 && questionImage ? RFValue(10) : RFValue(13),
          textAlign: 'center',
          color: '#262625',
        }}
      >
        {question || 'Which country does this flag belong to?'}
      </Text>
      {questionImage && (
        <Image
          onLoad={() => setImageLoaded(true)}
          contentFit='contain'
          source={{
            uri: questionImage || 'https://www.worldatlas.com/r/w1200/img/flag/ca-flag.jpg',
          }}
          style={{
            width: 180,
            height: 180,
          }}
        />
      )}
    </View>
  );
}
