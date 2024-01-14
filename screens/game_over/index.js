import { Avatar, Box, Button, Divider, HStack, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import RoundScoreTracker from '../../.storybook/stories/RoundScoreTracker/RoundScoreTracker';
import socketService from '../../services/socketService';

export default function GameOverScreen({ navigation, route }) {
  console.log('🚀  route.params?.results:', route.params?.results);
  const [roundScoreTrackerData, setRoundScoreTrackerData] = React.useState(null);

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

  useEffect(() => {
    // route.params?.results?.gameSession
    const playersScoreData = [];

    const playerOneData = route.params?.results?.gameSession.players[0].answers.map((answer) => {
      return answer.points;
    });

    const playerTwoData = route.params?.results?.gameSession.players[1].answers.map((answer) => {
      return answer.points;
    });

    playersScoreData.push({
      name: route.params?.results?.gameSession.players[0].name,
      rounds: playerOneData,
      total: playerOneData.reduce((a, b) => a + b, 0),
    });

    playersScoreData.push({
      name: route.params?.results?.gameSession.players[1].name,
      rounds: playerTwoData,
      total: playerTwoData.reduce((a, b) => a + b, 0),
    });

    setRoundScoreTrackerData(playersScoreData);
  }, []);

  const renderPlayerCard = (player, result) => {
    return (
      <VStack space={2} alignItems='center'>
        <Avatar
          size='xl'
          source={{
            uri: 'https://bit.ly/2Z4KKcF',
            headers: {
              Accept: '*/*',
            },
          }}
          borderColor={result === 'winner' ? 'green.400' : 'red.400'}
          borderWidth={4}
        />
        <Text style={styles.playerName}>{player?.name}</Text>
        <Box>
          <Text>Score</Text>
          <Text>{player?.score}</Text>
        </Box>
      </VStack>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
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
      {roundScoreTrackerData && <RoundScoreTracker players={roundScoreTrackerData} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
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
