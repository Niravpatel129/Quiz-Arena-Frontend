import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../../api/newRequest';
import { useAuth } from '../../context/auth/AuthContext';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import formatLastActive from '../../helpers/formatLastActive';

export default function ChatHistory() {
  const [chats, setChats] = useState([]);
  const [animations, setAnimations] = useState([]);
  const navigation = useNavigation();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    try {
      const response = await newRequest.get('/chat');
      const data = response.data;
      setChats(data);
      setAnimations(data.map(() => new Animated.Value(0))); // Initialize animations for each chat
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    // Trigger animations for each chat bubble
    animations.forEach((anim, index) => {
      setTimeout(() => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 100 * index);
    });
  }, [animations]);

  const renderChatBubble = (chat, index) => {
    const otherParticipant = chat.participants.find((p) => p._id !== userId);
    const slideAnimation = {
      opacity: animations[index],
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Chat', {
            chattingWithId: otherParticipant._id,
          })
        }
      >
        <Animated.View
          style={[
            {
              marginBottom: 10,
              backgroundColor: '#1d284b',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              padding: 10,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 30,
            },
            slideAnimation,
          ]}
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
                justifyContent: 'center',
                // alignItems: 'center',
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
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'white',
                    maxWidth: 200,
                  }}
                >
                  {capitalizeFirstLetter(otherParticipant.username) || 'Player Name'}
                </Text>
                {otherParticipant.lastActive && (
                  <Text
                    style={{
                      color: 'lightgray',
                      fontSize: 14,
                    }}
                  >
                    {formatLastActive(otherParticipant.lastActive, {
                      type: 'short',
                    })}
                  </Text>
                )}
              </View>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 14,
                  maxWidth: 200,
                  marginTop: 5,
                }}
              >
                {chat.messages.length > 0
                  ? `${chat.messages[chat.messages.length - 1].message}`
                  : ''}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginHorizontal: 10,
      }}
    >
      {!loading && chats.length === 0 && (
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

      {chats.map((chat, index) => (
        <React.Fragment key={index}>{renderChatBubble(chat, index)}</React.Fragment>
      ))}
    </View>
  );
}
