// JoinQueueButton.js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import socketService from '../../../services/socketService';

const JoinQueueButton = () => {
  const joinQueue = () => {
    socketService.emit('joinRoyalQueue');
  };

  return (
    <TouchableOpacity
      onPress={joinQueue}
      style={{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <Text style={{ color: 'black', fontSize: 16 }}>Join Queue</Text>
    </TouchableOpacity>
  );
};

export default JoinQueueButton;
