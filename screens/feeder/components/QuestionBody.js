import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const QuestionBody = ({ question }) => {
  const hasImage = question.helperImage && question.helperImage !== '';
  return (
    <View
      style={{
        flex: 1,
        justifyContent: hasImage ? 'flex-start' : 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      }}
    >
      <Text
        style={{
          fontSize: question.question.length > 40 ? RFValue(16) : RFValue(18),
          fontWeight: 'bold',
          fontFamily: 'poppins-regular',
          textAlign: 'center',
          color: 'white',
          marginBottom: hasImage ? 20 : 0,
        }}
      >
        {question.question}
      </Text>
      {hasImage && (
        <View
          style={{
            width: '70%',
            aspectRatio: 1.5,
            marginBottom: 10,
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 10,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: 'rgba(255, 255, 255, 1)',
          }}
        >
          <Image
            cachePolicy="memory-disk"
            contentFit="contain"
            source={{
              uri: question.helperImage || '',
            }}
            style={{
              width: '90%',
              height: '90%',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default QuestionBody;
