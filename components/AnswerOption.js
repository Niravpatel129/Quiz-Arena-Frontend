import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import shuffle from '../helpers/shuffle';

const AnswerOptions = ({ helperImage, answersOptions, handleAnswer, scores }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answerOptionsRandomized, setAnswerOptionsRandomized] = useState([]);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    answersOptions && setAnswerOptionsRandomized(shuffle(answersOptions));
  }, [answersOptions]);

  const onAnswerPress = (answerOption) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerOption);

    setIsCorrect(answerOption.isCorrect);
    handleAnswer(answerOption.optionText);
  };

  const calculateHeight = (score) => {
    return (score / 20) * 160;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftBar}>
        <View
          style={{
            height: `${calculateHeight(scores.yourScore)}px`,
            backgroundColor: '#adf2bc',
            borderRadius: 5,
          }}
        ></View>
      </View>
      <View style={styles.rightBar}>
        <View
          style={{
            height: `${calculateHeight(scores.opponentScore)}px`,
            backgroundColor: '#f2adad',
            borderRadius: 5,
          }}
        ></View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: helperImage,
          }}
        />
      </View>
      <View style={styles.answersContainer}>
        {answerOptionsRandomized.map((answerOption, index) => {
          let backgroundColor = '#fff'; // Default background
          if (answerOption === selectedAnswer) {
            backgroundColor = isCorrect ? '#adf2bc' : '#f2adad'; // Green if correct, red if incorrect
          }

          return (
            <Pressable
              style={[styles.option, { backgroundColor }]}
              onPress={() => onAnswerPress(answerOption)}
              key={index}
            >
              <Text style={styles.text}>{answerOption.optionText}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 10,
    border: '1px solid #000',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    textAlign: 'center',
  },
  answersContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    marginTop: 20,
    gap: '1rem',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  leftBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 10,
    height: '100%',
    backgroundColor: '#00ff00',
    borderRadius: 5,
  },
  rightBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: '100%',
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
});

export default AnswerOptions;
