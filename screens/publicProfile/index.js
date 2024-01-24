import React from 'react';
import { View } from 'react-native';
import Profile2 from '../profile2';

export default function PublicProfile({ route }) {
  const userId = route.params?.userId;

  return (
    <View
      style={{
        height: '100%',
      }}
    >
      <Profile2 userId={userId} />
      {/* <ProfileComponent userId={userId} /> */}
    </View>
  );
}
