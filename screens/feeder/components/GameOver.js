import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CustomButtom from './CustomButton';

export default function GameOver({ score, handleStartGame }) {
  const [isSelected, setIsSelected] = useState(false);
  const navigation = useNavigation();

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          textAlign: 'center',
          letterSpacing: 2,
        }}
      >
        How Awful!
      </Text>
      <Image
        source={{
          uri: 'https://cdn.discordapp.com/attachments/1201815017612398662/1202213592493981787/IMG_3419.webp?ex=65cca3a8&is=65ba2ea8&hm=3b03405ac15ecc894bab9a242ba73b08301b8cd8e5cb8dd634f5dbef8290f006&',
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'poppins-regular',
          letterSpacing: 2,
          color: 'black',
          textAlign: 'center',
        }}
      >
        Your Score: {score}
      </Text>
      <View
        style={{
          gap: 10,
        }}
      >
        <CustomButtom
          title='Restart Game'
          onPress={() => {
            console.log('Restart Game');
            handleStartGame();
          }}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        >
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            Restart Game
          </Text>
        </CustomButtom>
        <CustomButtom
          title='Restart Game'
          onPress={() => {
            navigation.navigate('Home');
          }}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        >
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            Go back home
          </Text>
        </CustomButtom>
      </View>
    </View>
  );
}
