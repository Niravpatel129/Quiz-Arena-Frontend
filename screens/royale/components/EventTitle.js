// EventTitle.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const EventTitle = ({ setShowIntroduction }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
      Trivia Royale Night (Beta)
    </Text>
    <TouchableOpacity onPress={() => setShowIntroduction(true)}>
      <Ionicons name='information-circle-outline' size={24} color='black' />
    </TouchableOpacity>
  </View>
);

export default EventTitle;
