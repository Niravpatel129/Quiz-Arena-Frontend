import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import socketService from '../../services/socketService';

export default function ChallengeScreen({ route, navigation }) {
  useEffect(() => {
    socketService.emit('joinChallengeQueue', {
      gameId: route.params.gameId,
      category: route.params.category,
    });

    socketService.on('game_start', (data) => {
      navigation.navigate('Game', { game: data.game });
    });
  }, []);

  return (
    <View>
      <Text>ChallengeScreen {route.params.category}</Text>
    </View>
  );
}
