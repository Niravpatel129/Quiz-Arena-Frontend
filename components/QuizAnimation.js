import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const QuizAnimation = ({ isVisible, playerOneName, playerTwoName }) => {
  const playerOnePosition = useRef(new Animated.Value(width)).current;
  const playerTwoPosition = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(playerOnePosition, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(playerTwoPosition, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset positions when not visible
      playerOnePosition.setValue(width);
      playerTwoPosition.setValue(-width);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.player,
          styles.playerOne,
          { transform: [{ translateX: playerOnePosition }] },
        ]}
      >
        <Text style={styles.playerText}>{playerOneName}</Text>
      </Animated.View>
      <View style={styles.slash} />
      <Animated.View
        style={[
          styles.player,
          styles.playerTwo,
          { transform: [{ translateX: playerTwoPosition }] },
        ]}
      >
        <Text style={styles.playerText}>{playerTwoName}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: '#0073df',
  },
  player: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerOne: {
    right: '50%',
  },
  playerTwo: {
    left: '50%',
  },
  slash: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: 'white',
    transform: [{ rotate: '10deg' }], // Adjust the angle for the curved slash
  },
  playerText: {
    fontSize: 80,
    color: 'white',
    fontWeight: 700,
  },
});

export default QuizAnimation;
