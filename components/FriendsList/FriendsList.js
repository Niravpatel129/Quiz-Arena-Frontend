import React, { useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../../api/newRequest';

export default function FriendsList() {
  const [friends = [], setFriends] = React.useState([]);
  const [textInput = '', setTextInput] = React.useState('');

  const fetchFriends = async () => {
    const response = await newRequest.get('/users/friends');
    const data = response.data;
    setFriends(data.friends);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleChallenge = async (id) => {
    try {
      const gameId = Math.floor(Math.random() * 1000000);

      await newRequest.post('/users/notifications', {
        type: 'gameInvite',
        receiverId: id,
        options: {
          gameId: gameId,
          category: 'Valorant',
        },
      });

      navigation.navigate('Challenge', { gameId: gameId, category: 'logos' });
    } catch (err) {
      console.log(err);
    }
  };

  const renderFriendsBubble = (friend) => {
    return (
      <View
        style={{
          backgroundColor: '#1d284b',
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 10,
          borderRadius: 52,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', {
              userId: friend._id,
            });
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 75,
              borderWidth: 3,
              borderColor: 'gold',
            }}
            source={{
              uri:
                friend.profile.avatar ||
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
              }}
            >
              {friend.username || 'Player Name'}
            </Text>

            <Text
              style={{
                color: 'gray',
                fontSize: 12,
              }}
            >
              Last Active 9m
            </Text>
          </View>
          <View
            style={
              {
                // marginRight: 20,
              }
            }
          >
            <TouchableOpacity
              style={{
                backgroundColor: 'gold',
                borderRadius: 12,
                padding: 10,
                marginRight: 70,
              }}
              onPress={() => handleChallenge(friend._id)}
            >
              <Text>Challenge</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          gap: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: '90%',
          }}
        >
          <TextInput
            placeholder='Search Friends'
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 20,
            }}
            onChangeText={(text) => setTextInput(text)}
            value={textInput}
          ></TextInput>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: -68,
              top: 4,
              backgroundColor: 'gold',
              borderRadius: 12,
              marginRight: 70,
              zIndex: 1,
              backgroundColor: '#1c2141',
              width: 70,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>

        {friends.length === 0 && (
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              paddingTop: 28,
              fontSize: 20,
            }}
          >
            You have no friends. Add some friends to challenge them to a game!
          </Text>
        )}

        {friends.map((friend, index) => {
          return <View key={index}>{renderFriendsBubble(friend)}</View>;
        })}
      </View>
    </>
  );
}
