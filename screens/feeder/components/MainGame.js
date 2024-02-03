import React from 'react';
import { View } from 'react-native';
import AnswersBody from './AnswersBody';
import QuestionBody from './QuestionBody';
import QuestionHeader from './QuestionHeader';
export default function MainGame({ question, onAnswer, showPickPercentage }) {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <QuestionHeader question={question} />
      <QuestionBody question={question} />
      <AnswersBody question={question} onAnswer={onAnswer} />
    </View>
  );
}
