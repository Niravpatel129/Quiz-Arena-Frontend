import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Answers from './components/answers';
import Header from './components/header';
import Question from './components/question';
import QuestionNoBar from './components/questionNoBar';

export default function Ingame2() {
  return (
    <LinearGradient
      colors={['#EC80B4', '#3F95F2']}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            height: '100%',

            margin: 10,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <View>
            <View
              style={{
                width: '100%',
              }}
            >
              <Header />
            </View>
            <View>
              <QuestionNoBar />
            </View>
            <View>
              <Question />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              marginBottom: 10,
            }}
          >
            <Answers />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
