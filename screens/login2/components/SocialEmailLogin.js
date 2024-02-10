// components/SocialEmailLogin.js
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SocialButton from '../../../components/SocialButton/SocialButton';

export default function SocialEmailLogin({ navigateToSignUp }) {
  return (
    <View
      style={{
        marginVertical: 20,
        width: '90%',
        alignItems: 'center',
      }}
    >
      <SocialButton variation={'Facebook'} />
      <SocialButton variation={'Apple'} />

      <TouchableOpacity
        onPress={navigateToSignUp}
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'Inter-SemiBold',
            fontWeight: '600',
            textDecorationLine: 'underline',
          }}
        >
          Sign in with Email Address
        </Text>
      </TouchableOpacity>
    </View>
  );
}
