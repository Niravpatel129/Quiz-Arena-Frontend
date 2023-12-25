import React from 'react';
import { View } from 'react-native';
import GameScreen from '../game';

const matchHistorydata = [
  {
    matchId: '1',
    icon: 'tv',
    category: 'Logos',
    opponent: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://picsum.photos/200',
    },
    date: '2023-12-24T13:00:00Z',
  },
  {
    icon: 'tv',
    category: 'Logos',
    opponent: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://picsum.photos/200',
    },
    date: '2021-09-04T13:00:00Z',
  },
];

const players = [
  { name: 'nirav2', rounds: [0, 19, 0, 0, 0, 19, 18, 0], total: 56 },
  { name: 'nirav444', rounds: [0, 0, 20, 19, 0, 0, 0, 18], total: 57 },
];

export default function Dev() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <GameScreen />
      {/* <RoundScoreTracker players={players} /> */}
      {/* <MatchHistory matchHistory={matchHistorydata} /> */}
    </View>
  );
}
