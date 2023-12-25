import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RoundScoreTracker = ({ players }) => {
  if (!players) return <View> no data </View>;

  const renderPlayer = (player) => {
    return (
      <View style={styles.playerContainer}>
        <Text style={styles.playerName}>{player.name}</Text>
        <View style={styles.roundsContainer}>
          {player.rounds.map((score, scoreIndex) => (
            <Text key={scoreIndex} style={styles.score}>
              {score}
            </Text>
          ))}
          <Text style={styles.total}>{player.total}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round Score Tracker</Text>
      {renderPlayer(players[0])}
      <View style={styles.playerContainer}>
        <View style={styles.middle}>
          {players[0].rounds.map((_, scoreIndex) => (
            <Text style={styles.roundCount} key={scoreIndex}>
              {scoreIndex + 1}
            </Text>
          ))}
          <Text style={styles.roundCount}>Total</Text>
        </View>
      </View>
      {renderPlayer(players[1])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  playerContainer: {
    marginBottom: 10,
  },
  playerName: {
    color: 'black',
    fontWeight: 'bold',
  },
  roundsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: {
    color: 'black',
    border: '1px solid black',
    padding: 5,
    fontSize: 26,
    width: 60,
    flex: 1,
    margin: 2,
    textAlign: 'center',
  },
  total: {
    color: 'white',
    backgroundColor: 'black',
    padding: 5,
    fontSize: 26,
    margin: 2,
    width: 60,
    textAlign: 'center',
  },
  middle: {
    display: 'flex',
    flexDirection: 'row',
  },
  roundCount: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default RoundScoreTracker;
