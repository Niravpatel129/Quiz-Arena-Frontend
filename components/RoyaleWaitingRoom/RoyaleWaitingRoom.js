import { Entypo, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export default function RoyaleWaitingRoom() {
  const renderPlayerBubble = () => {
    return (
      <View
        style={{
          backgroundColor: '#f1eeef',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Text
            style={{
              color: '#313438',
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            1.
          </Text>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=800',
            }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 300,
            }}
          />
          <Text
            style={{
              color: '#313438',
              fontSize: 18,
              marginVertical: 10,
              fontFamily: 'Roboto-Medium',
            }}
          >
            Alex Smith
          </Text>
          <CountryFlag isoCode='us' size={17} />
        </View>

        <View>
          <Text>3W</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#25303c',
      }}
    >
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <TouchableOpacity style={{}}>
              <Ionicons name='arrow-back' size={24} color='white' />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <TouchableOpacity style={{}}>
                <Entypo name='shop' size={24} color='white' />
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Ionicons name='chatbox' size={24} color='white' />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              color: '#f06e3d',
              textAlign: 'center',
              fontSize: 38,
              fontFamily: 'Roboto-Medium',
              margin: 10,
            }}
          >
            Trivia Royale
          </Text>

          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
              padding: 20,
            }}
          >
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=800',
              }}
              style={{
                height: 180,
                width: 180,
                borderWidth: 5,
                borderColor: 'white',
                borderRadius: 100,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  marginVertical: 10,
                }}
              >
                Alex Smith
              </Text>
              <CountryFlag isoCode='us' size={24} />
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontFamily: 'Roboto-Medium',
                }}
              >
                Game Status
              </Text>
              <Text
                style={{
                  color: 'lightgrey',
                  fontSize: 18,
                  fontFamily: 'Roboto-Medium',
                }}
              >
                Waiting for lobby
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#f06e3d',
                padding: 10,
                borderRadius: 10,
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Roboto-Medium',
                }}
              >
                Join Royale Queue
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                gap: 10,
              }}
            >
              {renderPlayerBubble()}
              {renderPlayerBubble()}
              {renderPlayerBubble()}
              {renderPlayerBubble()}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
