import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Scoresheet from '../../components/Scoresheet/Scoresheet';

export default function GameOver2() {
  const playerCard = () => {
    return (
      <View>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: '#00ff51',
          }}
          source={{
            uri: 'https://t4.ftcdn.net/jpg/01/62/72/29/360_F_162722972_3SlhxozZGdL3rGuWgKyVP2NTs8POtX2n.jpg',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 3,
            color: '#fff',
            fontFamily: 'Inter-Black',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Bob
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 3,
            color: '#fff',
            fontFamily: 'Inter-Black',
            fontWeight: 'bold',
            fontSize: 12,
          }}
        >
          1400 (-30)
        </Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        height: '100%',
      }}
    >
      <ScrollView>
        <View>
          <Text
            style={{
              fontSize: 40,
              color: '#00c03d',
              textAlign: 'center',
              marginTop: 120,
              fontWeight: 'bold',
              fontFamily: 'Inter-Black',
            }}
          >
            You Win!
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
            marginBottom: 30,
            justifyContent: 'space-evenly',
          }}
        >
          <View>{playerCard()}</View>
          <View>{playerCard()}</View>
        </View>

        <Scoresheet />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
            gap: 10,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#32547A6B',
              borderWidth: 2,
              borderRadius: 15,
              borderColor: '#667EB7',
              padding: 15,
            }}
          >
            <Ionicons name='ios-share-outline' size={22} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#32547A6B',
              borderWidth: 2,
              borderRadius: 15,
              borderColor: '#667EB7',
              padding: 15,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Inter-Black',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                Rematch
              </Text>
              <Ionicons
                style={{
                  paddingLeft: 10,
                }}
                name='ios-refresh-outline'
                size={22}
                color='#fff'
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#32547A6B',
              borderWidth: 2,
              borderRadius: 15,
              borderColor: '#667EB7',
              padding: 15,
            }}
          >
            <Ionicons name='ios-chatbox' size={22} color='#fff' />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
