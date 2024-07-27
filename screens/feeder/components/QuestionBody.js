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
        paddingHorizontal: 30, // Reduced padding to ensure the content is not too wide
      }}
    >
      <Text
        style={{
          fontSize: question.question.length > 40 ? RFValue(16) : RFValue(18), // Reduced font size
          fontWeight: 'bold',
          fontFamily: 'poppins-regular',
          textAlign: 'center',
          color: 'white',
          marginBottom: 20, // Reduced margin bottom to create space between text and image
        }}
      >
        {question.question}
      </Text>
      {question.helperImage && question.helperImage !== '' && (
        <View
          style={{
            width: '70%', // Reduced width
            aspectRatio: 1.5, // Maintain aspect ratio to ensure proper spacing
            marginBottom: 10,
            borderColor: 'white', // Added border color
            borderWidth: 2, // Added border width
            borderRadius: 10, // Optional: adds rounded corners to the border
            overflow: 'hidden', // Ensures the image does not overflow the border
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10, // Reduced padding to create space between the border and the image
            backgroundColor: 'rgba(255, 255, 255, 0.08)', // Added 8% white background color
          }}
        >
          <Image
            cachePolicy='memory-disk'
            contentFit='contain'
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
