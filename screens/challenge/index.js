import React, { useEffect } from 'react';

export default function ChallengeScreen({ route, navigation }) {
  useEffect(() => {
    // check if this is a new challange or a response to a challange
    // if new challange, emit a new challange event
    if (route.params?.friendId) {
      socketService.emit('new_challenge', route.params.friendId);
    }
    // if response to a challange, emit a response event
    if (route.params?.challengeId) {
      socketService.emit('challenge_response', route.params.challengeId);
    }
  }, []);
  return <div>ChallengeScreen</div>;
}
