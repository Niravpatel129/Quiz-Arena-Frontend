import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Question = ({ text }) => {
  // Create a reference to the animatable component
  const animatableRef = useRef(null);

  // Use useEffect to trigger the animation when the text changes
  useEffect(() => {
    if (animatableRef.current) {
      animatableRef.current.bounceIn();
    }
  }, [text]);

  return (
    <View style={styles.questionContainer}>
      <Animatable.Text ref={animatableRef} animation='bounceIn' style={styles.questionText}>
        {text}
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 44,
    color: '#000',
    textAlign: 'center',
  },
});

export default Question;
