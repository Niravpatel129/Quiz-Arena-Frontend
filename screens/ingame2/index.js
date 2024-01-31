import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Answers from './components/answers';
import Header from './components/header';
import Question from './components/question';
import QuestionNoBar from './components/questionNoBar';

export default function Ingame2({ roundNumber, InGameData, timer }) {
  const AnswersRef = React.useRef(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  useEffect(() => {
    imageLoaded && AnswersRef.current && AnswersRef.current.scrollToEnd({ animated: true });
  }, [imageLoaded, roundNumber]);

  useEffect(() => {
    setImageLoaded(false);
  }, [roundNumber]);

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
            ref={AnswersRef}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <View
              style={{
                width: '100%',
                flex: 1,
              }}
            >
              <View
                style={{
                  width: '100%',
                }}
              >
                <Header
                  timeRemaining={timer}
                  yourData={InGameData.PlayerOneInformation}
                  opponentData={InGameData.PlayerTwoInformation}
                />
              </View>
              <View>
                <QuestionNoBar roundNumber={roundNumber} />
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
                  height: '100%',
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Question
                  setImageLoaded={setImageLoaded}
                  question={InGameData.RoundData.question}
                  questionImage={InGameData.RoundData.image}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <Answers
                  answers={InGameData.RoundData.answers}
                  sessionId={InGameData.sessionId}
                  timeRemaining={timer}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
