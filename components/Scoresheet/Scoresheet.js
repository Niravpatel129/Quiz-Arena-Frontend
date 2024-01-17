import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FakeData = {
  playerOneData: {
    username: 'Bob',
    scores: [14, 0, 10, 10, 0, 10, 11, 65],
  },
  playerTwoData: {
    username: 'Zezima',
    scores: [17, 17, 17, 17, 17, 17, 17, 22],
  },
};

const Scoresheet = ({ playerOneData, playerTwoData }) => {
  const renderPlayerName = (player) => {
    return (
      <View
        style={{
          marginVertical: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height: 3,
            flex: 1,
            backgroundColor: 'gray',
          }}
        ></View>
        <Text
          style={{
            color: 'lightgray',
            marginHorizontal: 6,
            fontFamily: 'Inter-Black',
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {player.username}
        </Text>
        <View
          style={{
            height: 3,
            flex: 1,
            backgroundColor: 'gray',
          }}
        ></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          fontSize: 44,
        }}
      >
        +{playerTwoData.scores.length} Exp
      </Text>
      <Text
        style={{
          color: '#fff',
          marginVertical: 6,
          fontFamily: 'Inter-Black',
          fontWeight: 700,
          fontSize: 22,
        }}
      >
        Game Results
      </Text>
      <View>
        {renderPlayerName(playerOneData)}
        <View style={styles.row}>
          {playerOneData.scores.map((score, index) => {
            return (
              <Text key={index} style={styles.cell}>
                {score.points}
              </Text>
            );
          })}
          <Text style={styles.cellTotal}>
            {playerOneData.scores.reduce((acc, v) => acc + v.points, 0)}
          </Text>
        </View>
        <View style={styles.between}>
          <View style={[styles.row]}>
            {/* map 8 times */}
            {Array.from(Array(8).keys()).map((i) => {
              return (
                <Text
                  key={i}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    minWidth: i === 7 ? 55 : 40,
                    textAlign: 'center',
                    color: '#fff',
                    fontFamily: 'Inter-Regular',
                    fontSize: 12,
                  }}
                >
                  {i === 7 ? 'Total' : i + 1}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={styles.row}>
          {playerTwoData.scores.map((score, index) => {
            return (
              <Text key={index} style={styles.cell}>
                {score.points}
              </Text>
            );
          })}
          <Text style={styles.cellTotal}>
            {playerTwoData.scores.reduce((acc, v) => v.points + acc, 0)}
          </Text>
        </View>
        {renderPlayerName(playerTwoData)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  cell: {
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 5,
    width: 40,
    textAlign: 'center',
    backgroundColor: '#303E5F',
    color: '#fff',
    fontFamily: 'Inter-Black',
    fontWeight: 700,
  },
  cellTotal: {
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 5,
    width: 55,
    textAlign: 'center',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'Inter-Black',
    fontWeight: 700,
  },
  between: {
    // marginVertical: 4,
  },
});

export default Scoresheet;
