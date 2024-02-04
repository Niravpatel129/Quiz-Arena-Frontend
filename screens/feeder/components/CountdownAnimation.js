import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const CountdownAnimation = () => {
  const [count, setCount] = useState(3);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    let countdown = count;
    const interval = setInterval(() => {
      countdown -= 1;
      setCount(countdown);
      scale.value = withSequence(
        withTiming(1.5, { duration: 500, easing: Easing.out(Easing.exp) }), // Scale up
        withTiming(1, { duration: 500, easing: Easing.linear }), // Scale down
      );
      if (countdown === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 500 }),
      transform: [{ scale: scale.value }],
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedStyle]}>{count}</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
  },
});

export default CountdownAnimation;
