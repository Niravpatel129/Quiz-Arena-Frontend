import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AnswersBody from './AnswersBody';
import QuestionBody from './QuestionBody';
import QuestionHeader from './QuestionHeader';
export default function MainGame({ question, onAnswer, continueGame }) {
  return (
    <View
      style={{
        width: '100%',
        // justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <View
        style={{
          height: 50,
        }}
      >
        <QuestionHeader question={question} />
      </View>
      <QuestionBody question={question} />
      <AnswersBody question={question} onAnswer={onAnswer} />
      <View>
        <TouchableOpacity onPress={() => continueGame()}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
