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
        paddingHorizontal: 10,
        height: '100%',
        borderRadius: 20,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: question?.length > 40 && questionImage ? RFValue(12) : RFValue(17),
          letterSpacing: 0,
          textAlign: 'center',
          color: '#262625',
          marginBottom: 5,
        }}
      >
        {question || 'Which country does this flag belong to?'}
      </Text>
      {questionImage && (
        <View
          style={{
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 5, // For Android shadow effect
            backgroundColor: '#fff', // Assuming the shadow color serves as the border
            padding: 10,
          }}
        >
          <Image
            onLoad={() => setImageLoaded(true)}
            contentFit='contain'
            source={{
              uri: questionImage,
            }}
            style={{
              width: 280, // Static width, consider adjusting
              height: 140, // Static height, consider adjusting
              backgroundColor: '#fff', // Background color as border
            }}
          />
        </View>
      )}
    </View>
  );
}
