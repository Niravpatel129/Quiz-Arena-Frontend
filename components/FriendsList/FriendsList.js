import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { newRequest } from '../../api/newRequest';
import formatLastActive from '../../helpers/formatLastActive';
import ChallangeModal from '../ChallangeModal/ChallangeModal';

export default function FriendsList() {
  const [friends = [], setFriends] = React.useState([]);
  const [textInput = '', setTextInput] = React.useState('');
  const [friendRequests = [], setFriendRequests] = React.useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const fetchFriends = async () => {
    setRefreshing(true);

    try {
      const response = await newRequest.get('/users/friends');
      const data = response.data;
      setFriends(data.friends);
    } catch (err) {
      console.log(err);
    }

    setRefreshing(false);
  };

  const fetchFriendRequests = async () => {
    setRefreshing(true);

    try {
      const response = await newRequest.get('/users/notifications');
      const data = response.data.notifications.map((notification) => {
        return notification.type === 'friendRequest' ? notification : null;
      });

      setFriendRequests(data);
    } catch (err) {
      console.log(err);
    }

    setRefreshing(false);
  };

  const sendFriendRequest = async () => {
    try {
      if (!textInput) return;

      await newRequest.post('/users/notifications', {
        type: 'friendRequest',
        receiverName: textInput,
      });

      setTextInput('');

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Success',
        text2: 'Friend request sent!',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Friend request failed to send.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  const onRefresh = () => {
    fetchFriends();
    fetchFriendRequests();
  };

  const renderRequestsBubble = (friend) => {
    if (!friend) return null;

    return (
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <View>
              <Image
                cachePolicy='memory-disk'
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
                  headers: {
                    Accept: '*/*',
                  },
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
                  color: 'black',
                  fontSize: 14,
                  maxWidth: 250,
                  marginLeft: 10,
                  maxWidth: 300,
                  fontFamily: 'Inter-Bold',
                }}
              >
                {friend?.message}
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
                  onPress={() => acceptFriendRequest(friend.from, friend._id)}
                  style={{
                    backgroundColor: '',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                  }}
                >
                  <Ionicons name='checkmark' size={40} color='#5aff60' />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteFriendRequest(friend._id)}
                  style={{
                    backgroundColor: '',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                  }}
                >
                  <Ionicons name='close' size={40} color='#ff7878' />
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

  const acceptFriendRequest = async (friendId, notificationId) => {
    await newRequest.post('/users/addFriend', { friendId });
    await newRequest.delete(`/users/notifications/${notificationId}`);

    fetchFriends();
    fetchFriendRequests();
  };

  const handleChallenge = async (id) => {
    try {
      showModal();
      setSelectedFriendId(id);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const renderFriendsBubble = (friend) => {
    console.log('🚀  friend:', friend);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Chat', {
            chattingWithId: friend._id,
          })
        }
        style={{
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#C0E1FD',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderRadius: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PublicProfile', {
              userId: friend._id,
            });
          }}
        >
          <Image
            cachePolicy='memory-disk'
            style={{
              width: 60,
              height: 60,
              borderRadius: 75,
              borderWidth: 1,
              borderColor: 'white',
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
                fontWeight: 700,
                fontSize: 16,
                color: '#474747',
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
              Last Active {formatLastActive(friend.lastActive, { type: 'short' })}
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
                backgroundColor: '#206DD8',
                fontFamily: 'Inter-Bold',
                borderRadius: 12,
                padding: 10,
                marginRight: 70,
              }}
              onPress={() => handleChallenge(friend._id)}
            >
              <Text
                style={{
                  // color: '#1c2141',
                  color: 'white',
                  fontFamily: 'Inter-Bold',
                }}
              >
                Challenge
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={{
        height: '100%',
      }}
    >
      <ChallangeModal
        opponentUserId={selectedFriendId}
        isModalVisible={isModalVisible}
        hideModal={hideModal}
      />
      <View
        style={{
          gap: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            width: '100%',
          }}
        >
          <TextInput
            placeholder='Search Friends'
            style={{
              borderWidth: 1,
              borderColor: '#C0E1FD',
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
              backgroundColor: '#84BDFA',
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
                fontWeight: 700,
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
          return (
            <View
              style={{
                marginTop: 10,
                width: '100%',
                marginHorizontal: 10,
                paddingHorizontal: 10,
              }}
              key={index}
            >
              {renderFriendsBubble(friend)}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
