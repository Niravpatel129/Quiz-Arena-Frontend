import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const socialLoginVariations = {
  Facebook: {
    onPress: () => {},
    icon: 'logo-facebook',
    text: 'Continue With Facebook',
    color: '#4768ab',
  },
  Google: {
    onPress: () => {},
    icon: 'logo-google',
    text: 'Continue With Google',
    color: '#DB4437',
  },
  Twitter: {
    onPress: () => {},
    icon: 'logo-twitter',
    text: 'Continue With Twitter',
    color: '#1DA1F2',
  },
  Apple: {
    onPress: () => {},
    icon: 'logo-apple',
    text: 'Continue With Apple',
    color: 'black',
  },
};

export default function SocialButton({ variation }) {
  const { onPress, icon, text, color } = socialLoginVariations[variation] || {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#e9eef3',
        padding: 16,
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Ionicons name={icon} size={20} color={color} />
        <Text
          style={{
            marginLeft: 6,
            color: color,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
