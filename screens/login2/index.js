import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import SocialButton from '../../components/SocialButton/SocialButton';

export default function Login() {
  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
      <SafeAreaView
        style={{
          height: '100%',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 50,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
          }}
        >
          Quiz Arena
          <Ionicons
            style={{
              paddingLeft: 10,
            }}
            name='book'
            size={50}
            color='white'
          />
        </Text>
        <View
          style={{
            marginTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{
              width: 500,
              height: 500,
            }}
            source={{
              uri: 'https://cdn.discordapp.com/attachments/1085326974353952898/1190996477250646046/DALL_E_2023-12-31_07.31.43_-_A_logo_for__Quiz_Arena__depicted_from_a_straight__front-facing_angle__suitable_for_high-resolution_displays_and_branding_materials._The_logo_should_fe-removebg-preview.png?ex=65a3d4e7&is=65915fe7&hm=35760445baa19b994baaaa5bdc8737eb3f32849ac99d38e8b0c4db66c5484836&',
            }}
          />

          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            }}
          >
            Welcome to Quiz Arena, where knowledge meets challenge. Sign in and join the ultimate
            trivia competition!
          </Text>

          <View>
            <SocialButton />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
