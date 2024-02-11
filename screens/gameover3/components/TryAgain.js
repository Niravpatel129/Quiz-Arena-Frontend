import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export default function TryAgain({ didWin }) {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current; // Use for spring rotation

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        // Spring animation for rotation
        Animated.spring(rotateAnim, {
          toValue: 1, // End value for the rotation
          friction: 5, // Customize the bounciness
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // Interpolate rotate value for a 0 to 360 degrees rotation
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View>
        <Animated.Image
          source={require('../../../assets/smiley_face.png')}
          style={{
            width: 100,
            height: 100,
            marginBottom: 10,
            transform: [
              // Apply spring rotation here
              { rotate },
              // Apply additional transform if needed, for example, the win/lose flip
              { rotate: didWin ? '0deg' : '180deg' },
            ],
          }}
        />
      </View>
      <Animated.Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 26,
          color: '#181A17',
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {didWin ? 'Yay! You won! 🎉' : 'Oops! You lost 🚨'}
      </Animated.Text>
    </View>
  );
}
