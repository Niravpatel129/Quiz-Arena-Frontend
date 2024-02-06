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
          fontSize: question.question.length > 40 ? RFValue(18) : RFValue(20),
          fontWeight: 'bold',
          fontFamily: 'poppins-regular',
          textAlign: 'center',
        }}
      >
        {question.question}
      </Text>
      {question.helperImage && question.helperImage !== '' && (
        <Image
          contentFit='contain'
          source={{
            uri: question.helperImage || '',
          }}
          style={{
            width: '100%',
            height: 150,
            marginBottom: 10,
          }}
        />
      )}
    </View>
  );
};

export default QuestionBody;
