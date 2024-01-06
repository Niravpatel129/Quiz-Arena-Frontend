import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

const HighlightEffect = ({ isCorrect, trigger }) => {
  console.log('🚀  trigger:', trigger);
  const highlightAnim = useRef(new Animated.Value(0)).current;
  const highlightColor = isCorrect ? '#5aff60' : '#ff7878';
  const { width } = Dimensions.get('window');

  useEffect(() => {
    if (trigger) {
      Animated.sequence([
        Animated.timing(highlightAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(300),
        Animated.timing(highlightAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [trigger, highlightAnim]);

  const highlightStyle = {
    ...styles.highlight,
    width: width * 0.2, // Set width to 20% of the screen width
    opacity: highlightAnim,
  };

  return (
    <Animated.View style={highlightStyle}>
      <LinearGradient
        colors={['transparent', highlightColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFillObject}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default HighlightEffect;
