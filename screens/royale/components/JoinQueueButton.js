import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import socketService from '../../../services/socketService';

const JoinQueueButton = ({ status, players, isInQueue }) => {
  // State to manage button cooldown
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const toggleQueue = () => {
    if (isButtonDisabled) return; // Prevent action if button is in cooldown

    if (!isInQueue) {
      socketService.emit('joinRoyalQueue');
    } else {
      socketService.emit('leaveRoyalQueue');
    }

    setIsButtonDisabled(true); // Disable button
    setTimeout(() => {
      setIsButtonDisabled(false); // Re-enable button after 5 seconds
    }, 5000);
  };

  return (
    <View style={{ borderWidth: 1, borderColor: 'black', padding: 50, borderRadius: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 20, color: '#030303' }}>
        Game Status:{' '}
        <Text style={{ textTransform: 'capitalize' }}>
          {status || `Waiting [${players?.length || 0}/10] players to join...`}
        </Text>
        {status === 'waiting' && <> [{players?.length || 0}/10] players to join...</>}
      </Text>
      <TouchableOpacity
        onPress={toggleQueue}
        disabled={isButtonDisabled} // Use the state to disable the button
        style={{
          backgroundColor: isButtonDisabled ? '#f0f0f0' : '#fff', // Change color when disabled
          borderWidth: 1,
          borderColor: 'black',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: isButtonDisabled ? '#a0a0a0' : 'black', fontSize: 16 }}>
          {isInQueue ? 'Leave Queue' : 'Join Queue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinQueueButton;
