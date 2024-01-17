import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Header = ({ yourData, opponentData, countdown }) => {
  const renderPlayerCard = (playerData, type) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: type !== 'you' ? 'row-reverse' : 'row',
          gap: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Image
          style={[
            styles.tinyLogo,
            {
              borderColor: type !== 'you' ? '#ff0000' : '#01ff38',
            },
          ]}
          source={{
            uri:
              playerData?.playerInformation?.avatar ||
              'https://assets-prd.ignimgs.com/2022/08/17/runescape-old-school-button-1660778096603.jpg',
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: type !== 'you' ? 'flex-end' : 'flex-start',
          }}
        >
          <Text style={styles.playerName}>{playerData?.name}</Text>
          <Text style={styles.playerTag}>Rating: {playerData?.playerInformation.elo?.rating}</Text>
          <Text style={styles.playerScore}>{playerData?.score}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.usersContainer}>
        <View>{renderPlayerCard(yourData, 'you')}</View>
        <View style={styles.timer}>
          {countdown > 0 ? <Text>Time Remaining: {countdown}</Text> : <Text>Time's Up!</Text>}
        </View>
        <View>{renderPlayerCard(opponentData)}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  usersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  userInfo: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 20,
    fontWeight: 700,
  },
  playerTag: {
    fontSize: 12,
    fontWeight: 700,
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 700,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    borderWidth: 2,
    // borderColor: '#01ff38',
  },
  playercard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // Centers items vertically in the row
    justifyContent: 'space-between', // Adjusts spacing between items
  },
});

export default Header;
