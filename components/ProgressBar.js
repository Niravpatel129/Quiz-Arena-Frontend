import React from 'react';
import { StyleSheet, View } from 'react-native';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    height: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00ff00',
  },
});

export default ProgressBar;
