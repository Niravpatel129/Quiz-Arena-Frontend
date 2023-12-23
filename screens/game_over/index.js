import { Avatar, Box, Button, Divider, HStack, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import socketService from '../../services/socketService';

export default function GameOverScreen({ navigation, route }) {
  const myData = route.params?.results?.gameSession.players?.find(
    (player) => player?.socketId === socketService?.socket?.id,
  );
  const opponentData = route.params?.results?.gameSession.players?.find(
    (player) => player?.socketId !== socketService?.socket?.id,
  );

  const whoWon = () => {
    if (myData?.score > opponentData?.score) {
      return 'You won!';
    } else if (myData?.score < opponentData?.score) {
      return 'You lost!';
    } else {
      return 'It was a tie!';
    }
  };

  const renderPlayerCard = (player, result) => {
    return (
      <VStack space={2} alignItems='center'>
        <Avatar
          size='xl'
          source={{ uri: 'https://bit.ly/2Z4KKcF' }}
          borderColor={result === 'winner' ? 'green.400' : 'red.400'}
          borderWidth={4}
        />
        <Text style={styles.playerName}>{player?.name}</Text>
        <Text>{player?.title || 'Title'}</Text>
        <Box>
          <Text>Match Score</Text>
          <Text>{player?.score}</Text>
        </Box>
        <Box>
          <Text>Bonus Points</Text>
          <Text>{player?.bonus || 5}</Text>
        </Box>
      </VStack>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <VStack space={4} alignItems='center' safeArea>
        <Text fontSize='xl' bold style={styles.title}>
          {whoWon()}
        </Text>
        <HStack space={120}>
          {/* Player Info */}
          {renderPlayerCard(myData, myData?.score > opponentData?.score ? 'winner' : 'loser')}

          {/* Opponent Info */}
          {renderPlayerCard(opponentData, opponentData?.score > myData?.score ? 'winner' : 'loser')}
        </HStack>
        <Divider my='2' />
        <Text fontSize='md'>Level {myData?.level || 2}</Text>
        {/* Replace with your progress bar */}
        <HStack space={3} mt='4'>
          <Button onPress={() => navigation.navigate('Categories')}>Categories</Button>
          <Button onPress={() => navigation.navigate('Categories')}>Play Another</Button>
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
  title: {
    marginBottom: 20,
    fontSize: 42,
    textAlign: 'center',
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
