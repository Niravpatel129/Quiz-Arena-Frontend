import * as Contacts from 'expo-contacts';
import { ScrollView } from 'native-base';
import React, { useEffect } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { newRequest } from '../../api/newRequest';

export default function SocialsList() {
  const [friends = [], setFriends] = React.useState([]);
  const [syncedFriends = [], setSyncedFriends] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');

  useEffect(() => {
    const getContacts = async () => {
      try {
        // Ask for permission to query contacts.

        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails, Contacts.Fields.Name],
          });

          if (data.length > 0) {
            console.log('🚀  data:', data);

            const newFriends = data.map((contact) => {
              return {
                name: contact.name,
                email: contact?.emails?.[0]?.email,
                status: 'not friends',
              };
            });

            setFriends(newFriends);
          }
        }
      } catch (error) {
        console.error('Error accessing contacts', error);
      }
    };

    Alert.alert(
      'Sync Contacts',
      'We will sync your contacts to find your friends on Quiz Arena. We will not store your contacts.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sync',
          onPress: () => {
            getContacts();

            console.log('OK Pressed');
          },
        },
      ],
      { cancelable: false },
    );
  }, []);

  useEffect(() => {
    sendAllEmailsToBackend();
  }, [friends]);

  const sendAllEmailsToBackend = async () => {
    try {
      const response = await newRequest.post('/users/sync-contacts', {
        contacts: friends.filter((friend) => friend.email).map((friend) => friend.email),
      });

      const returnedFriends = response.data?.friends;

      const newFriends = returnedFriends.map((friend) => {
        return {
          email: friend.email,
          name: friend.username,
          avatar: friend.profile?.avatar,
          status: 'friends',
        };
      });

      setSyncedFriends(newFriends);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderFriendsBubble = (friend, syncedFriend) => {
    if (!friend) return null;
    if (!friend.name) return null;

    if (syncedFriends.find((f) => f.email === friend.email)) return null;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#1d284b',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderRadius: 52,
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
            style={{
              width: 50,
              height: 50,
              borderRadius: 75,
              borderWidth: 1,
              borderColor: 'white',
            }}
            source={{
              uri:
                friend.profile?.avatar ||
                'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg',
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
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: 'white',
                marginTop: 5,
              }}
            >
              {friend.name || 'No Name'}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: syncedFriend ? '#8fff66' : '#1c2141',
                fontFamily: 'Inter-Bold',
                borderRadius: 12,
                padding: 20,
                marginRight: 50,
                // minWidth: 100,
                alignItems: 'center',
              }}
              onPress={() => {
                if (syncedFriend) return;

                Share.share({
                  message: `Hey, join me on the Quiz Arena, available on Apple app store and Google play store!`,
                });
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Bold',
                }}
              >
                {syncedFriend ? 'Friends' : 'Invite'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredFriends = textInput
    ? friends.filter((friend) => friend?.name?.toLowerCase()?.includes(textInput.toLowerCase()))
    : friends;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={
        {
          // marginHorizontal: 10,
        }
      }
    >
      <SafeAreaView>
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
        {syncedFriends.map((friend, index) => {
          return (
            <View
              style={{
                marginTop: 10,
                width: '100%',
                paddingHorizontal: 10,
              }}
              key={index}
            >
              {renderFriendsBubble(friend)}
            </View>
          );
        })}
        {filteredFriends.map((friend, index) => {
          return (
            <View
              style={{
                marginTop: 10,
                width: '100%',
                paddingHorizontal: 10,
              }}
              key={index}
            >
              {renderFriendsBubble(friend)}
            </View>
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
}
