import React from 'react';
import ProfileComponent from '../../components/ProfileComponent/ProfileComponent';

export default function PublicProfile({ route }) {
  const userId = route.params?.userId;

  return (
    <>
      <ProfileComponent userId={userId} />
    </>
  );
}
