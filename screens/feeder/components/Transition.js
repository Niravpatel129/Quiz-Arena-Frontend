import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Transition = ({ animationText }) => {
  const [index, setIndex] = useState(0); // Current question index
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Fade in the question text
    opacity.value = withTiming(1, { duration: 300 });

    // Wait for a few seconds, then fade out and show the next question
    // const timeout = setTimeout(() => {
    //   opacity.value = withTiming(0, { duration: 300 }, () => {
    //     // Move to the next question or loop back to the first
    //     setIndex((prevIndex) => (prevIndex + 1) % animationText.length);
    //   });
    // }, 1000);

    // return () => clearTimeout(timeout);
  }, [index, animationText.length]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          scale: interpolate(opacity.value, [0, 1], [0.5, 1], Extrapolate.CLAMP),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <Text
          style={{
            fontSize: 44,
            textAlign: 'center',
            letterSpacing: 2,
          }}
        >
          {animationText[index]}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    // Adjust your text container styling as needed
  },
  text: {
    fontSize: 20,
    // Adjust your text styling as needed
  },
});

export default Transition;
