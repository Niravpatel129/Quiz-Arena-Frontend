import { Box, Heading, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import socketService from '../../services/socketService';

export default function QueueScreen({ route, navigation }) {
  const { categoryName } = route.params;
  const [queueTime, setQueueTime] = React.useState(1);
  const [playersInQueue, setPlayersInQueue] = React.useState(0);

  const startTimer = () => {
    setInterval(() => {
      setQueueTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    socketService.emit('join_queue', categoryName);
    startTimer();

    socketService.on('queue_update', (data) => {
      setPlayersInQueue(data.queue.length);
    });

    socketService.on('game_start', (data) => {
      console.log('game_start', data);
      navigation.navigate('Game', { game: data.game });
    });

    return () => {
      setQueueTime(0);
      socketService.emit('leave_queue', categoryName);
    };
  }, []);

  return (
    <Box flex={1} bg='#fff' alignItems='center' justifyContent='center' p={5}>
      <VStack space={8} alignItems='center' bg='#0099ff' p={10} borderRadius='lg' shadow={2}>
        <Heading color='#fff' fontSize='4xl' fontWeight='semibold'>
          Queue
        </Heading>
        <Text color='#fff' fontSize='md' fontWeight='bold'>
          Category:{' '}
          <Text color='#322a55' fontSize='md' fontWeight='bold'>
            {categoryName}
          </Text>
        </Text>
        <Text color='#fff' fontSize='md' fontWeight='bold'>
          Waiting Time:{' '}
          <Text color='#322a55' fontSize='md' fontWeight='bold'>
            {queueTime} seconds ⏳
          </Text>
        </Text>
        <Text color='#fff' fontSize='md' fontWeight='bold'>
          Players in Queue:{' '}
          <Text color='#322a55' fontSize='md' fontWeight='bold'>
            {playersInQueue}
          </Text>
        </Text>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
