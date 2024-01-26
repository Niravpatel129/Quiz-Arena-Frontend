import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Exp from './components/Exp';
import ScoreCard from './components/ScoreCard';
import TryAgain from './components/TryAgain';

export default function GameOver3() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#EC80B4', '#3F95F2']}
      style={{
        height: '100%',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 100,
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
            marginTop: 20,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            width: '100%',
            height: '100%',
            paddingVertical: 40,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              height: '100%',
            }}
          >
            <View>
              <TryAgain />
            </View>
            <View>{/* <PlayerCards /> */}</View>
            <View
              style={{
                marginTop: 50,
                alignItems: 'center',
              }}
            >
              <Exp />
            </View>
            <View
              style={{
                marginTop: 50,
                alignItems: 'center',
              }}
            >
              <ScoreCard />
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
