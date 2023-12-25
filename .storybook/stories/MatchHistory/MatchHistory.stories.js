import React from 'react';
import { View } from 'react-native';
import MatchHistory from './MatchHistory';

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

const MyButtonMeta = {
  title: 'MatchHistory',
  component: MatchHistory,
  argTypes: {},
  args: {},
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <MatchHistory matchHistory={matchHistorydata} />
      </View>
    ),
  ],
};

export default MyButtonMeta;

export const Basic = {};
