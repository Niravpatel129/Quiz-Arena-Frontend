import React from 'react';
import Profile2 from '../profile2';

export default function PublicProfile({ route }) {
  const userId = route.params?.userId;

  return (
    <>
      <Profile2 userId={userId} />
      {/* <ProfileComponent userId={userId} /> */}
    </>
  );
}
