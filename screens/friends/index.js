import React, { useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../../api/newRequest';

export default function FriendsScreen({ navigation }) {
  const [activeTab, setActiveTab] = React.useState('tab1');
  const [friends = [], setFriends] = React.useState([]);

  const fetchFriends = async () => {
    const response = await newRequest.get('/users/friends');
    const data = response.data;
    setFriends(data.friends);
  };

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
  useEffect(() => {
    fetchFriends();
  }, []);

  const renderFriendsBubble = (friend) => {
    return (
      <View
        style={{
          backgroundColor: 'lightgray',
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
    <SafeAreaView>
      <ScrollView
        style={{
          backgroundColor: '#1c2141',
          height: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
            backgroundColor: '#1d284b',
            margin: 10,
            borderRadius: 22,
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveTab('tab1')}
            style={{
              backgroundColor: activeTab === 'tab1' ? 'lightgray' : '#1c2141',
              borderRadius: 22,
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === 'tab1' ? '#1c2141' : '#ffffff',
                fontSize: 22,
                fontWeight: 'bold',
              }}
            >
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('tab2')}
            style={{
              backgroundColor: activeTab === 'tab2' ? 'lightgray' : '#1c2141',
              borderRadius: 22,
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === 'tab2' ? '#1c2141' : '#ffffff',
                fontSize: 22,
                fontWeight: 'bold',
              }}
            >
              Chats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('tab3')}
            style={{
              backgroundColor: activeTab === 'tab3' ? 'lightgray' : '#1c2141',
              borderRadius: 22,
              flex: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: activeTab === 'tab3' ? '#1c2141' : '#ffffff',
                fontSize: 22,
                fontWeight: 'bold',
              }}
            >
              Social
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            gap: 12,
          }}
        >
          {friends.map((friend, index) => {
            return <View key={index}>{renderFriendsBubble(friend)}</View>;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
