import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function QueueScreen({ route, navigation }) {
  const { categoryName } = route.params;

  return (
    <View style={styles.container}>
      <Text>This is the queue screen.</Text>
      <Text>{categoryName}</Text>
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
