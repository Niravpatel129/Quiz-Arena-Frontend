import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Chat() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
              source={{
                uri: 'https://storage.googleapis.com/pai-images/04a4d16220a645408362ae47deb07737.jpeg',
              }}
            />

            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginHorizontal: 20,
              }}
            >
              LTX Sam
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              style={{
                marginRight: 10,
              }}
              name='close'
              size={32}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ flex: 1 }}>
          <ScrollView
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                color: 'white',
              }}
            >
              Placeholder
            </Text>
          </ScrollView>
        </LinearGradient>

        <View
          style={{
            height: 70,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{
              backgroundColor: '#cccccc',
              height: 50,
              width: '90%',
              padding: 10,
              borderRadius: 4,
              fontSize: 16,
            }}
            placeholder='Type here'
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 25,
              backgroundColor: '#1c2141',
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
