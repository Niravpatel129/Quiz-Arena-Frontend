import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function SoloPreGame() {
  const navigation = useNavigation();
  const backgroundImage = require('./images/background.png');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
        resizeMode='cover' // or "contain", depending on your needs
      >
        <View style={{ flex: 1, height: '100%', margin: 30 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ position: 'absolute', top: 0, left: 0, padding: 0, zIndex: 1 }}
          >
            <Ionicons name='close' size={30} color='#fff' />
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: 'poppins-semiBold',
                fontSize: 24,
                textAlign: 'center',
                color: '#fff',
              }}
            >
              Feeder Mode (Solo)
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#84BDFA',
                padding: 10,
                borderRadius: 10,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 40,
              }}
            >
              <Text style={{ fontFamily: 'poppins-bold', fontSize: 18, color: '#fff' }}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
