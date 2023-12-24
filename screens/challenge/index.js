import React, { useEffect } from 'react';
import socketService from '../../services/socketService';

export default function ChallengeScreen({ route, navigation }) {
  console.log('🚀  route:', route);

  useEffect(() => {
    socketService.emit('joinChallengeQueue', {
      gameId: route.params.gameId,
      category: route.params.category,
    });

    socketService.on('game_start', (data) => {
      console.log('game_start', data);
      navigation.navigate('Game', { game: data.game });
    });
  }, []);
  return <div>ChallengeScreen</div>;
}
