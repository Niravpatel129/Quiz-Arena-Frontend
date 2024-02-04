import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AnswersBody from './AnswersBody';
import QuestionBody from './QuestionBody';
import QuestionHeader from './QuestionHeader';

export default function MainGame({ question, onAnswer, continueGame, score, setGameOver }) {
  // Opacity value is controlled by a shared value, starting from 0 (invisible).
  const opacity = useSharedValue(0);

  // useEffect to start the animation when the component mounts.
  useEffect(() => {
    // Opacity animates to 1 (fully visible) over 500 milliseconds.
    opacity.value = withTiming(1, { duration: 500 });
  }, [opacity]);

  // Animated style that will interpolate the opacity shared value.
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (!question) {
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
  }

  // Wrap the main content with an Animated.View to apply the animated styles.
  return (
    <Animated.View
      style={[
        {
          padding: 10,
          width: '100%',
          height: '100%',
        },
        animatedStyle, // Apply the animated opacity style here.
      ]}
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
    </Animated.View>
  );
}
