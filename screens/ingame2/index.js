import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, View } from 'react-native';
import Answers from './components/answers';
import Header from './components/header';
import Question from './components/question';
import QuestionNoBar from './components/questionNoBar';

export default function Ingame2({ roundNumber, InGameData, timer }) {
  const AnswersRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Initial value for opacity: 0
  const questionFadeAnim = useRef(new Animated.Value(0)).current;
  const answersFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    imageLoaded && AnswersRef.current && AnswersRef.current.scrollToEnd({ animated: true });
  }, [imageLoaded, roundNumber]);

  useEffect(() => {
    setImageLoaded(false);

    // Reset opacity to 0 before starting the animation for both question and answers
    questionFadeAnim.setValue(0);
    answersFadeAnim.setValue(0);

    // Sequence to animate question first, then answers after a delay
    Animated.sequence([
      Animated.timing(questionFadeAnim, {
        toValue: 1, // Fade in the question
        duration: 500, // Animation duration of 500ms
        useNativeDriver: true,
      }),
      Animated.delay(1000), // Delay of 1500ms (2 seconds) before starting the next animation
      Animated.timing(answersFadeAnim, {
        toValue: 1, // Fade in the answers
        duration: 500, // Animation duration of 500ms
        useNativeDriver: true,
      }),
    ]).start();
  }, [roundNumber]); // Dependency array includes roundNumber to trigger effect on its change

  return (
    <LinearGradient colors={['#EC80B4', '#3F95F2']} style={{ flex: 1, height: '100%' }}>
      <SafeAreaView style={{ flex: 1, height: '100%' }}>
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
            style={{ width: '100%', height: '100%' }}
          >
            <View style={{ width: '100%', flex: 1 }}>
              <View style={{ width: '100%' }}>
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
            <Animated.View
              style={{
                justifyContent: 'space-between',
                flex: 1,
                opacity: questionFadeAnim, // Use the animated opacity value for question
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
            </Animated.View>
            <Animated.View
              style={{
                width: '100%',
                flex: 1,
                justifyContent: 'flex-end',
                opacity: answersFadeAnim, // Use the animated opacity value for answers
              }}
            >
              <Answers
                answers={InGameData.RoundData.answers}
                sessionId={InGameData.sessionId}
                timeRemaining={timer}
              />
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
