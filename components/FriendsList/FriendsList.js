import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../../api/newRequest';
import formatLastActive from '../../helpers/formatLastActive';

export default function FriendsList() {
  const [friends = [], setFriends] = React.useState([]);
  const [textInput = '', setTextInput] = React.useState('');
  const [friendRequests = [], setFriendRequests] = React.useState([]);

  const fetchFriends = async () => {
    try {
      const response = await newRequest.get('/users/friends');
      const data = response.data;
      setFriends(data.friends);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await newRequest.get('/users/notifications');
      console.log('🚀  response:', response);
      const data = response.data.notifications.map((notification) => {
        return notification.type === 'friendRequest' ? notification : null;
      });

      setFriendRequests(data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendFriendRequest = async () => {
    try {
      await newRequest.post('/users/notifications', {
        type: 'friendRequest',
        receiverName: textInput,
      });

      setTextInput('');
      alert('Friend request sent!');
    } catch (err) {
      console.log(err);
      alert('User not found');
    }
  };

  const renderRequestsBubble = (friend) => {
    console.log('🚀  friend:', friend);
    return (
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <View>
              <Image
                style={{
                  width: 55,
                  height: 55,
                  marginTop: 9,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: 'white',
                }}
                source={{
                  uri: 'https://png.pngtree.com/png-vector/20230120/ourlarge/pngtree-social-media-friend-add-icon-png-image_6564195.png',
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  maxWidth: 250,
                  marginLeft: 10,
                  // marginTop: 10,
                  maxWidth: 300,
                  fontFamily: 'Inter-Bold',
                }}
              >
                {friend.message}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 7,
                  marginLeft: 10,
                  marginTop: 2,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '',
                    // padding: 8,
                    // paddingHorizontal: 18,
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                  }}
                >
                  <Ionicons name='checkmark' size={40} color='#5aff60' />
                  {/* <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                    onPress={() => acceptFriendRequest()}
                  >
                    Accept
                  </Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteFriendRequest(friend._id)}
                  style={{
                    backgroundColor: '',
                    // padding: 8,
                    // paddingHorizontal: 18,
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                  }}
                >
                  <Ionicons name='close' size={40} color='#ff7878' />
                  {/* <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                  >
                    Decline
                  </Text> */}
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                color: 'lightgray',
                fontSize: 14,
                fontFamily: 'Inter-SemiBold',
                marginLeft: 5,
                marginTop: 10,
              }}
            >
              {formatLastActive(friend.createdAt, {
                type: 'short',
              })}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, []);

  const deleteFriendRequest = async (id) => {
    await newRequest.delete(`/users/notifications/${id}`);
    fetchFriendRequests();
  };

  const acceptFriendRequest = async (friendId) => {};

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
            onSubmitEditing={() => sendFriendRequest()}
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
            onPress={() => sendFriendRequest()}
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

        {friends.length === 0 && friendRequests.length === 0 && (
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

        {friendRequests.length > 0 && (
          <>
            {friendRequests.map((friend, index) => {
              return <View key={index}>{renderRequestsBubble(friend)}</View>;
            })}
          </>
        )}

        {friends.map((friend, index) => {
          return <View key={index}>{renderFriendsBubble(friend)}</View>;
        })}
      </View>
    </>
  );
}
