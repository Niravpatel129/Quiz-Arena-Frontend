import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
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
        height: '100%',
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
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
            padding: 10,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <View
              style={{
                width: '100%',
              }}
            >
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
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  marginTop: 10,
                  marginBottom: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Question />
              </View>
              <View
                style={{
                  width: '100%',
                  flex: 1,
                }}
              >
                <Answers />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
