import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GameScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the game screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
