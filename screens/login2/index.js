import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function Login() {
  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: '100%' }}
    >
      <SafeAreaView
        style={{
          height: '100%',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Hello World</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}
