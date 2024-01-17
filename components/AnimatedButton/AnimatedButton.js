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

  const generateColorBasedOnNumber = (number) => {
    if (number === 0) return 'gray'; // red

    // green to red 20 is the max
    let greenStart = 246;
    let red = Math.floor(110 + 145 * (1 - number / 20)); // 110 is the starting red value, 255-110=145 is the range
    let green = Math.floor(greenStart * (number / 20));

    let color = `rgb(${red}, ${green}, 0)`;

    return color;
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ width: '100%' }}
    >
      <Animated.View style={[style, animatedStyle]}>
        {children}
        <Animated.Text
          style={[
            floatingTextStyle,
            {
              color: generateColorBasedOnNumber(number),
              fontSize: 24,
              fontFamily: 'Inter-SemiBold',
              fontWeight: 'semibold',
            },
          ]}
        >
          +{number}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedButton;
