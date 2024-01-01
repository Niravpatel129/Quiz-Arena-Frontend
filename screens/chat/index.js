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

const fakeChatData = {
  chatingWith: {
    name: 'LTX Sam',
    avatar: 'https://storage.googleapis.com/pai-images/04a4d16220a645408362ae47deb07737.jpeg',
    lastActive: '8 mins ago',
  },
  chatMessages: [
    {
      name: 'John',
      message: 'Hello, how are you?',
      isSender: true,
      sentAgo: '7 mins ago',
    },
    {
      name: 'LTX Sam',
      message: 'I am good, how are you?',
      isSender: false,
      sentAgo: '6 mins ago',
    },
  ],
};

export default function Chat() {
  const renderChatBubble = (messageData) => {
    const { name, message, isSender, sentAgo } = messageData;
    return (
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 10,
          alignSelf: isSender ? 'flex-start' : 'flex-end',
        }}
      >
        <Text style={{ color: 'white', marginHorizontal: 5, marginBottom: 5 }}>
          {name} {sentAgo}
        </Text>
        <View
          style={{
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'center',
            minHeight: 50,
          }}
        >
          <Text style={{ zIndex: 1, color: 'black', fontSize: 16, padding: 10 }}>{message}</Text>
        </View>
      </View>
    );
  };

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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={{ uri: fakeChatData.chatingWith.avatar }}
            />
            <View style={{ flexDirection: 'column', marginHorizontal: 20 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                {fakeChatData.chatingWith.name}
              </Text>
              <Text style={{ color: '#d2d2d2', fontSize: 14 }}>
                Active {fakeChatData.chatingWith.lastActive}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name='close' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            {fakeChatData.chatMessages.map((msg, index) => (
              <View key={index}>{renderChatBubble(msg)}</View>
            ))}
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
              backgroundColor: '#ffffff',
              height: 50,
              width: '90%',
              padding: 10,
              borderRadius: 8,
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
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
