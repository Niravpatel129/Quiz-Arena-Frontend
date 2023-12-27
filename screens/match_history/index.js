import React from 'react';
import MatchHistory from '../../.storybook/stories/MatchHistory/MatchHistory';

export default function MatchHistoryScreen() {
  return <MatchHistory matchHistory={matchHistorydata} />;
}

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
