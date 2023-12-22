import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Question = ({ text }) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{text}</Text>
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
