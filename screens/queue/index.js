import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import socketService from '../../services/socketService';

export default function QueueScreen({ route, navigation }) {
  const { categoryName } = route.params;
  const [queueTime, setQueueTime] = React.useState(0);
  const [playersInQueue, setPlayersInQueue] = React.useState(0);

  const startTimer = () => {
    setInterval(() => {
      setQueueTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    socketService.connect();

    socketService.on('connection', () => {
      console.log('connection');

      socketService.emit('join_queue', categoryName);
      startTimer();
    });

    socketService.on('queue_update', (data) => {
      console.log('queue_update', data);
      setPlayersInQueue(data.queue.length);
    });

    socketService.on('game_start', (data) => {
      console.log('game_start', data);
      navigation.navigate('Game', { game: data.game });
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is the queue screen.</Text>
      <Text>{categoryName}</Text>
      <Text>In queue for: {queueTime} second</Text>
      <Text>Players in queue: {playersInQueue}</Text>
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
