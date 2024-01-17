import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RoundScoreTracker = ({ players }) => {
  const renderPlayer = (player) => {
    return (
      <View style={styles.playerContainer}>
        <Text style={styles.playerName}>{player.name}</Text>
        <View style={styles.roundsContainer}>
          {player.rounds.map((score, scoreIndex) => (
            <View key={scoreIndex} style={styles.scoreContainer}>
              <Text style={styles.score}>{score}</Text>
            </View>
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
        <View style={styles.middle}></View>
      </View>
      {renderPlayer(players[1])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  playerContainer: {
    marginBottom: 10,
    flex: 1,
    minHeight: 50,
  },
  playerName: {
    color: 'black',
    fontWeight: 700,
  },
  roundsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: {
    color: 'black',
    borderWidth: 1,

    padding: 5,
    fontSize: 18,
    // width: 60,
    flex: 1,
    margin: 2,
    textAlign: 'center',
  },
  total: {
    color: 'white',
    backgroundColor: 'black',
    padding: 5,
    fontSize: 18,
    margin: 2,
    width: 50,
    textAlign: 'center',
    flex: 1,
  },
  middle: {
    display: 'flex',
    flexDirection: 'row',
  },
  scoreContainer: {
    flex: 1,
    // height: 150,
  },
  roundCount: {
    flex: 1,
    // minWidth: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
    marginLeft: 10,
  },
});

export default RoundScoreTracker;
