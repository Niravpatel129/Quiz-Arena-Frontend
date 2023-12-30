import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export default function Scorebar({ score, color }) {
  const MAX_SCORE = 140;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: score,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [score]);

  const heightInterpolation = animation.interpolate({
    inputRange: [0, MAX_SCORE],
    outputRange: ['0%', '100%'], // Interpolates height from 0 to 100% of the container
  });

  return (
    <View
      style={{
        height: 270,
        width: 8,
        borderRadius: 25,
        backgroundColor: '#516696',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          height: heightInterpolation,
          width: '100%',
          backgroundColor: color,
          borderRadius: 10,
        }}
      />
    </View>
  );
}
