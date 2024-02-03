import React from 'react';
import { View } from 'react-native';
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

      <View
        style={{
          marginVertical: 20,
        }}
      ></View>
      <AnswersBody question={question} onAnswer={onAnswer} continueGame={continueGame} />
    </View>
  );
}
