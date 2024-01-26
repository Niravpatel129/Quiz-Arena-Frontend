import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Exp from './components/Exp';
import TryAgain from './components/TryAgain';

export default function GameOver3() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        colors={['#EC80B4', '#3F95F2']}
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
            }}
          ></View>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 30,
              textAlign: 'center',
              fontFamily: 'poppins-semiBold',
              marginTop: 50,
              marginBottom: 50,
            }}
          >
            Result
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'categories' }],
              });
            }}
          >
            <Ionicons name='close' size={24} color='white' />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#ffffff',
            flex: 1,
            marginTop: 10,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              marginVertical: 20,
            }}
          >
            <TryAgain />
          </View>
          <View>{/* <PlayerCards /> */}</View>
          <View>
            <Exp />
          </View>
          <Text>Main Content</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
