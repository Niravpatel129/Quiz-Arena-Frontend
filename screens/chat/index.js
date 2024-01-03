import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
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
import { newRequest } from '../../api/newRequest';
import formatLastActive from '../../helpers/formatLastActive';

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

export default function Chat({
  navigation,
  route: {
    params: { chattingWithId },
  },
}) {
  const [chat, setChat] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');
  const scrollViewRef = useRef();

  const fetchChat = async () => {
    const chatRes = await newRequest.post('/chat/create', {
      friendId: chattingWithId,
    });

    setChat(chatRes.data);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chat]);

  const sendMessage = async () => {
    try {
      await newRequest.post(`/chat/send/${chat._id}`, {
        message: textInput,
      });

      setTextInput('');
      fetchChat();
    } catch (err) {
      console.log('🚀 ~ file: index.js ~ line 114 ~ sendMessage ~ err', err);
    }
  };

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
          {name} {sentAgo && formatLastActive(sentAgo)}
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

  if (!chat.chatingWith)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Loading...
        </Text>
      </View>
    );

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
              source={{ uri: chat.chatingWith?.avatar }}
            />
            <View style={{ flexDirection: 'column', marginHorizontal: 20 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                {chat.chatingWith?.name}
              </Text>
              <Text style={{ color: '#d2d2d2', fontSize: 14 }}>
                Active{' '}
                {chat.chatingWith?.lastActive && formatLastActive(chat.chatingWith?.lastActive)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name='close' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ flex: 1 }}>
          {chat.chatMessages.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>No messages yet</Text>
            </View>
          )}
          <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
            {chat.chatMessages.map((msg, index) => (
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
            onChangeText={(text) => setTextInput(text)}
            value={textInput}
            placeholder='Type here'
          />
          <TouchableOpacity
            onPress={() => sendMessage(chat._id)}
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
