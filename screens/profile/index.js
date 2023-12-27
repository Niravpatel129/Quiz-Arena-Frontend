import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1c2141',
      }}
    >
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
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

          <Text style={{ color: 'white', fontSize: 30, marginTop: 10 }}>
            John Doe
            {/* <CountryFlag isoCode='ru' size={18} style={{ marginLeft: 10 }} /> */}
          </Text>
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
              gap: 10,
              // minWidth: 400,
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 30,
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: '#ffffff',
                paddingHorizontal: 20,
                backgroundColor: '#c73dce',
                flex: 1,
                alignItems: 'center',
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
                borderColor: '#ffffff',
                paddingHorizontal: 20,
                backgroundColor: '#ce3d3d',
                flex: 1,
                alignItems: 'center',
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
                borderColor: '#ffffff',
                paddingHorizontal: 20,
                backgroundColor: '#ce753d',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
