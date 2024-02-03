import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const QuestionBody = ({ question }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: RFValue(20),
          fontWeight: 'bold',
          fontFamily: 'poppins-regular',
          textAlign: 'center',
        }}
      >
        {question.question}
      </Text>
      {question.helperImage && (
        <Image
          contentFit='contain'
          source={{
            uri:
              question.helperImage ||
              'https://cdn1.tedsby.com/tb/medium/storage/9/3/6/936400/handmade-cat-cute-kitten-by-inna-vishevskaya.jpg',
          }}
          style={{
            width: '100%',
            height: 200,
            marginBottom: 10,
          }}
        />
      )}
    </View>
  );
};

export default QuestionBody;
