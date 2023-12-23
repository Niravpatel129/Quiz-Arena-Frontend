import { Box, Button, Divider, HStack, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <VStack space={4} alignItems='center' safeArea>
        <Text fontSize='xl' bold>
          {whoWon()}
        </Text>
        <HStack space={6}>
          {/* Player Info */}
          <VStack space={2} alignItems='center'>
            <Text>{myData.username}</Text>
            <Text>{myData.title || 'Title'}</Text>
            <Box>
              <Text>Match Score</Text>
              <Text>{myData.score}</Text>
            </Box>
            <Box>
              <Text>Bonus Points</Text>
              <Text>{myData.bonus || 5}</Text>
            </Box>
          </VStack>
          {/* Opponent Info */}
          <VStack space={2} alignItems='center'>
            <Text>{opponentData.username}</Text>
            <Text>{opponentData.title || 'Title'}</Text>
            <Box>
              <Text>Victory</Text>
              <Text>{opponentData.score}</Text>
            </Box>
            <Box>
              <Text>Power Points</Text>
              <Text>{opponentData.bonus || 5}</Text>
            </Box>
          </VStack>
        </HStack>
        <Divider my='2' />
        <Text fontSize='md'>Level {myData.level || 2}</Text>
        {/* Replace with your progress bar */}
        <HStack space={3} mt='4'>
          <Button onPress={() => navigation.navigate('Rematch')}>REMATCH</Button>
          <Button onPress={() => navigation.navigate('NewGame')}>Play Another</Button>
        </HStack>
        <Button variant='outline' mt='4' onPress={() => console.log('Share')}>
          Share
        </Button>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
