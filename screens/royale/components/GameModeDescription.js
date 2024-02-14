// GameModeDescription.js
import React from 'react';
import { Text, View } from 'react-native';

const GameModeDescription = () => (
  <View style={{ marginBottom: 20 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
      Game Mode: Open Queue Battle Royale
    </Text>
    {/* Game mode details */}
    <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 5 }}>
      - Limited to 20 players per session.
    </Text>
    <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 5 }}>
      - Players are placed in a bracket upon joining the queue.
    </Text>
    <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 5 }}>
      - Compete in head-to-head matches to advance.
    </Text>
    <Text style={{ fontSize: 16, textAlign: 'center' }}>
      - The last player standing wins the Battle Royale.
    </Text>
  </View>
);

export default GameModeDescription;
