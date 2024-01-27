import React from 'react';
import { View } from 'react-native';
import UserProfile from './components/UserProfile';

export default function Homepage() {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      <UserProfile />
      {/* <Text>Homepage</Text> */}
    </View>
  );
}
