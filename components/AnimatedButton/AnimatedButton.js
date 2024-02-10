import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedButton = ({ children, onPress, style, number }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const floatingTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
      position: 'absolute',
      bottom: 30,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress && onPress();
    // Trigger the floating text animation
    opacity.value = withTiming(1, { duration: 200 });
    translateY.value = withSequence(
      withTiming(-50, { duration: 500 }), // Move up
      withTiming(-60, { duration: 500 }), // Continue a bit more
      withTiming(0, { duration: 0 }), // Reset without delay
    );
    opacity.value = withSequence(
      withTiming(1, { duration: 500 }),
      withTiming(0, { duration: 500 }), // Fade out
    );
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ width: '100%' }}
    >
      <Animated.View style={[style, animatedStyle]}>
        {children}
        {number && (
          <Animated.Text
            style={[
              floatingTextStyle,
              {
                color: number === 0 ? '#EC0394' : '#EC80B4',
                fontSize: 24,
                fontFamily: 'poppins-semiBold',
              },
            ]}
          >
            +{number}
          </Animated.Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;
