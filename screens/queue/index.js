import { Box, Heading, Text, VStack } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import socketService from '../../services/socketService';

export default function QueueScreen({ route, navigation }) {
  const { categoryName } = route.params;
  const [queueTime, setQueueTime] = React.useState(1);
  const [playersInQueue, setPlayersInQueue] = React.useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setQueueTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    if (queueTime === 15) {
      console.log('adding bot');
      socketService.emit('add_bot', categoryName);
    }
  }, [queueTime]);

  useEffect(() => {
    socketService.emit('join_queue', categoryName);
    startTimer();

    socketService.on('queue_update', (data) => {
      setPlayersInQueue(data.queue.length);
    });

    socketService.on('game_start', (data) => {
      navigation.navigate('Game', { game: data.game });
      clearInterval(intervalRef.current);
    });

    return () => {
      setQueueTime(0);
      socketService.emit('leave_queue', categoryName);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Box flex={1} bg='#fff' alignItems='center' justifyContent='center' p={5}>
      <VStack space={8} alignItems='center' bg='#0099ff' p={20} borderRadius='lg' shadow={2}>
        <Heading color='#fff' fontSize='4xl' fontWeight='semibold'>
          Queue
        </Heading>
        <Text color='#fff' fontSize='md' fontWeight={700}>
          Category:{' '}
          <Text color='#322a55' fontSize='md' fontWeight={700}>
            {categoryName}
          </Text>
        </Text>
        <Text color='#fff' fontSize='md' fontWeight={700}>
          Waiting Time:{' '}
          <Text color='#322a55' fontSize='md' fontWeight={700}>
            {queueTime} seconds ⏳
          </Text>
        </Text>
        <Text color='#fff' fontSize='md' fontWeight={700}>
          Players in Queue:{' '}
          <Text color='#322a55' fontSize='md' fontWeight={700}>
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
