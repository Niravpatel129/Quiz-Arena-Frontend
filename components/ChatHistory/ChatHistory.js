import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../../api/newRequest';
import { useAuth } from '../../context/auth/AuthContext';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import formatLastActive from '../../helpers/formatLastActive';

export default function ChatHistory() {
  const [chats, setChats] = React.useState([]);
  const navigation = useNavigation();
  const { userId } = useAuth();

  const fetchChats = async () => {
    const response = await newRequest.get('/chat');
    const data = response.data;
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const renderChatBubble = (chat) => {
    const otherParticipant = chat.participants.find((participant) => {
      return participant._id !== userId;
    });

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat', {
            chattingWithId: otherParticipant._id,
          });
        }}
        style={{
          marginBottom: 10,
        }}
      >
        <View
          style={{
            backgroundColor: '#1d284b',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', {
                userId: otherParticipant._id,
              });
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 75,
                borderWidth: 3,
                borderColor: '#ffffff',
              }}
              source={{
                uri:
                  otherParticipant.profile.avatar ||
                  'https://upload.wikimedia.org/wikipedia/en/e/e0/Felicette%2C_spacecat.jpg',
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
            }}
          >
            <View
              style={{
                flex: 1,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'white',
                  maxWidth: 200,
                }}
              >
                {capitalizeFirstLetter(otherParticipant.username) || 'Player Name'}
                {otherParticipant.lastActive && (
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                    }}
                  >
                    {' '}
                    Last Active {formatLastActive(otherParticipant.lastActive)}
                  </Text>
                )}
              </Text>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 14,
                  maxWidth: 200,
                }}
              >
                {chat.messages.length > 0 && `${chat.messages[chat.messages.length - 1].message}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginHorizontal: 10,
      }}
    >
      {chats.length === 0 && (
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            paddingTop: 28,
            fontSize: 20,
          }}
        >
          You have no chats.
        </Text>
      )}

      {chats.map((chat, index) => {
        return <React.Fragment key={index}>{renderChatBubble(chat)}</React.Fragment>;
      })}
    </View>
  );
}
