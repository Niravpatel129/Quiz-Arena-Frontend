import React from 'react';
import { ScrollView, View } from 'react-native';
import CategoriesList from './components/CategoriesList';
import UserProfile from './components/UserProfile';

export default function Homepage() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          padding: 10,
          backgroundColor: '#fff',
          height: '100%',
          gap: 20,
        }}
      >
        <UserProfile />
        <CategoriesList />
        <CategoriesList />
        <CategoriesList />
      </View>
    </ScrollView>
  );
}
