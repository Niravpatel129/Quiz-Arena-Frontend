import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import socketService from '../../services/socketService';

export default function GameOverScreen({ navigation, route }) {
  console.log('🚀  route.params?.results:', route.params?.results.gameSession);
  console.log('🚀  socketService.socket.id:', socketService.socket.id);

  const myData = route.params?.results?.gameSession.players?.find(
    (player) => player.socketId === socketService.socket.id,
  );
  const opponentData = route.params?.results?.gameSession.players?.find(
    (player) => player.socketId !== socketService.socket.id,
  );

  const whoWon = () => {
    if (myData.score > opponentData.score) {
      return 'You won!';
    } else if (myData.score < opponentData.score) {
      return 'You lost!';
    } else {
      return 'It was a tie!';
    }
  };

  console.log('🚀  myData:', myData);
  console.log('🚀  opponentData:', opponentData);

  return (
    <View style={styles.container}>
      <Text>{whoWon()}</Text>
      <Text>Your score: {myData.score}</Text>
      <Text>Opponent score: {opponentData.score}</Text>

      {/* play again */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('Categories')}>
        <Text style={styles.text}>Play again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#ff6d6d',
    color: '#fff',
  },
  text: {
    fontSize: '1.5rem',
    color: '#fff',
  },
});
