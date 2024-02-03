import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function MainGame({ question, onAnswer }) {
  console.log('🚀  question:', question);
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            flexDirection: 'row',
          }}
        >
          <Ionicons name='rocket' size={32} color='black' />
          <Text>63</Text>
        </Text>
        <Text>Music</Text>
        <Text>
          <Ionicons name='skull' size={32} color='black' />
        </Text>
      </View>
    );
  };

  const renderQuestionBody = () => {
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

  const renderAnswerButton = ({ answer }) => {
    console.log('🚀  answer:', answer);
    return (
      <TouchableOpacity
        onPress={() => onAnswer(answer.optionText)}
        style={{
          borderWidth: 1,
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: RFValue(20),
            fontWeight: 'bold',
            fontFamily: 'poppins-regular',
          }}
        >
          {answer.optionText}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAnswersBody = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: 5,
        }}
      >
        {question.answers.map((answer, index) => {
          return <React.Fragment key={index}>{renderAnswerButton({ answer })}</React.Fragment>;
        })}
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
      }}
    >
      {renderHeader()}
      {renderQuestionBody()}
      {renderAnswersBody()}
    </View>
  );
}
