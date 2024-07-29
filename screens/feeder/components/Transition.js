import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
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
      <Animated.View
        style={[
          styles.textContainer,
          animatedStyle,
          {
            height: '100%',
            flex: 1,
            marginTop: '40%',
          },
        ]}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            letterSpacing: 2,
            color: 'white',
          }}
        >
          {animationText[index]}
        </Text>
        {animationText[index + 1] && (
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              letterSpacing: 2,
              color: 'white',
            }}
          >
            {animationText[index + 1]}
          </Text>
        )}
        <Image
          source={require('../../../assets/transition-axolotl.png')} // Have a thumbs up mascot image
          cachePolicy='memory-disk'
          style={{
            paddingTop: 15,
            width: 300,
            height: 300,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    // Adjust your text container styling as needed
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    backgroundColor: 'invisible',
  },
});

export default Transition;
