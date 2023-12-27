import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export default function ProfileScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1c2141',
      }}
    >
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              marginTop: 20,
              borderWidth: 8,
              borderColor: 'white',
            }}
            source={{
              uri: 'https://t4.ftcdn.net/jpg/05/69/84/67/360_F_569846700_i3o9u2fhPVVq7iJAzkqMqCwjWSyv53tT.jpg',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>John Doe</Text>
            <CountryFlag isoCode='aq' size={18} style={{ marginLeft: 10 }} />
          </View>
          <Text style={{ color: 'gray', fontSize: 18, marginTop: 3 }}>Element of Suprise</Text>
          <Text style={{ color: 'lightgray', fontSize: 18, marginTop: 30 }}>
            <Ionicons name='location' size={18} color='lightgray' />
            Last Active 8 min ago
          </Text>

          <View
            style={{
              backgroundColor: '#1d284b',
              width: 300,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
              marginTop: 30,
              borderRadius: 22,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              Average Rating: 2212
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 5,
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 30,
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                paddingHorizontal: 20,
                backgroundColor: '#c73dce',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Challenge</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 30,
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                paddingHorizontal: 20,
                backgroundColor: '#ce3d3d',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 30,
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                paddingHorizontal: 20,
                backgroundColor: '#ce753d',
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Chat</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 30 }}>
            <View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'space-between',
                  marginTop: 20,
                  gap: 25,
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      textAlign: 'center',
                      marginBottom: 10,
                      fontWeight: 'bold',
                    }}
                  >
                    Total Games
                  </Text>
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: '#1d284b',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 120,
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 18, color: 'white' }}>11230</Text>
                  </View>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      textAlign: 'center',
                      marginBottom: 10,
                      fontWeight: 'bold',
                    }}
                  >
                    Win Rate
                  </Text>
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: '#1d284b',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 120,
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 18 }}>44%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View>
            {/* You Vs */}
            <View
              style={{
                marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 44, fontWeight: 'bold', marginBottom: 10 }}>
                You vs
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: 'lightgray',
                    borderRadius: 10,
                    width: 150,
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 48,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1d284b',
                    }}
                  >
                    1 W
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'lightgray',
                    borderRadius: 10,
                    width: 150,
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 48,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1d284b',
                    }}
                  >
                    11 L
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
