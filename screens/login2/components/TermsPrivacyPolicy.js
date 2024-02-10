// components/TermsPrivacyPolicy.js
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

export default function TermsPrivacyPolicy() {
  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 40,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 12,
        }}
      >
        By continuing, you agree to the
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://quizarena.gg/privacy')}
        style={{
          marginLeft: 2,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 12,
            textDecorationLine: 'underline',
          }}
        >
          Terms and Privacy Policy
        </Text>
      </TouchableOpacity>
    </View>
  );
}
