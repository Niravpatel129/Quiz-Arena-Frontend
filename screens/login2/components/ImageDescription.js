// components/ImageDescription.js
import React from 'react';
import { Image, Text, View } from 'react-native';

export default function ImageDescription({ onImageLoad }) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        onLoad={onImageLoad}
        style={{
          width: 200,
          height: 200,
          marginVertical: 20,
        }}
        source={{
          uri: 'https://cdn.discordapp.com/attachments/.../2_copy.png',
        }}
      />
      <Text
        style={{
          fontSize: 18,
          width: 400,
          fontWeight: '700',
          color: 'white',
          textAlign: 'center',
          fontFamily: 'Inter-Black',
        }}
      >
        Where knowledge meets challenge
      </Text>
    </View>
  );
}
