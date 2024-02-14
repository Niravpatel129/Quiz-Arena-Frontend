// GameTips.js
import React from 'react';
import { Text, View } from 'react-native';

const GameTips = () => (
  <View style={{ marginBottom: 20 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
      Tips for Success
    </Text>
    {/* You can add more tips here or make them dynamic */}
    <Text style={{ fontSize: 16, textAlign: 'center' }}>
      - Familiarize yourself with the game rules before joining.
    </Text>
    <Text style={{ fontSize: 16, textAlign: 'center' }}>
      - Practice your skills in quick matches.
    </Text>
    <Text style={{ fontSize: 16, textAlign: 'center' }}>
      - Team up with friends for a better strategy.
    </Text>
  </View>
);

export default GameTips;
