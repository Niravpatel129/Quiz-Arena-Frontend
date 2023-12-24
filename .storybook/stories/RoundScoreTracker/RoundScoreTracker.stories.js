import React from 'react';
import { View } from 'react-native';
import RoundScoreTracker from './RoundScoreTracker';

const players = [
  {
    name: 'Jason McCabe Calacanis',
    rounds: [18, 20, 0, 19, 15, 40],
    total: 131,
  },
  {
    name: 'Thor Fridriksson',
    rounds: [19, 20, 17, 18, 16, 36],
    total: 126,
  },
];

const MyButtonMeta = {
  title: 'RoundScoreTracker',
  component: RoundScoreTracker,
  argTypes: {},
  args: {},
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <RoundScoreTracker players={players} />
      </View>
    ),
  ],
};

export default MyButtonMeta;

export const Basic = {};
