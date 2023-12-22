import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const useConditionalFadeIn = (trigger, duration = 500) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger) {
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    } else {
      opacity.setValue(0);
    }
  }, [trigger, opacity, duration]);

  return opacity;
};

export default useConditionalFadeIn;
