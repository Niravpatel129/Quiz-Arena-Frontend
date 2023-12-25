import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

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
          style={styles.tinyLogo}
          source={{
            uri: 'https://assets-prd.ignimgs.com/2022/08/17/runescape-old-school-button-1660778096603.jpg',
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
          <Text style={styles.playerTag}>Beginner</Text>
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
          <Text>
            <Progress.Circle
              progress={countdown / 100}
              size={70}
              unfilledColor='#6f6f6f'
              borderColor={'#f2f2f2'}
              thickness={12}
              showsText={true}
              formatText={(countdown) => {
                // dont show decimals
                return Math.round(countdown * 10);
              }}
              textStyle={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#007afe',
              }}
            ></Progress.Circle>
          </Text>
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
    fontWeight: 'bold',
  },
  playerTag: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    borderWidth: 2,
    borderColor: '#01ff38',
  },
  playercard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // Centers items vertically in the row
    justifyContent: 'space-between', // Adjusts spacing between items
  },
});

export default Header;
