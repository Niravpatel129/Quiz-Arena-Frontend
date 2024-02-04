import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AnswersBody from './AnswersBody';
import QuestionBody from './QuestionBody';
import QuestionHeader from './QuestionHeader';
export default function MainGame({ question, onAnswer, continueGame, score, setGameOver }) {
  if (!question)
    return (
      <View
        style={{
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size='large' color='#000' />
      </View>
    );

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <View
        style={{
          height: 50,
        }}
      >
        <QuestionHeader score={score} question={question} />
      </View>
      <QuestionBody question={question} />

      <View
        style={{
          marginVertical: 20,
        }}
      ></View>
      <AnswersBody
        question={question}
        onAnswer={onAnswer}
        continueGame={continueGame}
        setGameOver={setGameOver}
      />
    </View>
  );
}
