import React from 'react';
import { View } from 'react-native';
import MatchHistory from '../../.storybook/stories/MatchHistory/MatchHistory';

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

export default function Dev() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <MatchHistory matchHistory={matchHistorydata} />
    </View>
  );
}
