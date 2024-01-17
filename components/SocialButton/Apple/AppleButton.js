import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { getLocales } from 'expo-localization';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../../../api/newRequest';
import { useSocket } from '../../../context/socket/SocketContext';

export default function SocialButton({ variation }) {
  const navigation = useNavigation();
  const socket = useSocket();

  const handlePress = async (item) => {
    if (item === 'apple') {
      await signInWithApple();
    } else {
      console.log('🚀  item:', item);
    }
  };

  const signInWithApple = async () => {
    try {
      console.log('🚀  signInWithApple');

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // console.log('🚀  credential:', credential);
      // Signed in

      const username = credential.fullName?.givenName;
      const email = credential.email;
      const appleId = credential.user;

      //   alert(JSON.stringify(credential));

      const loginAuth = await newRequest
        .post('/auth/apple', {
          appleId,
          email,
          username,
          country: getLocales()[0]?.regionCode?.toLowerCase(),
        })
        .then((res) => {
          socket.ConnectSocket();

          const newSignIn = res.data?.newSignIn;

          if (!res.data.user?.username || !res.data.user?.profile?.avatar || newSignIn) {
            console.log('🚀  navigating to create profile:', res.data?.user?.username);
            console.log('🚀  navigating to create profile:', res.data.user?.profile?.avatar);

            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'CreateProfile',
                  params: {
                    currentUsername: res?.data?.user?.username,
                    currentAvatar: res?.data?.user?.profile?.avatar,
                  },
                },
              ],
            });

            return;
          }

          navigation.reset({
            index: 0,
            routes: [{ name: 'Categories' }],
          });
        })
        .catch((err) => {
          console.log('🚀  err:', err);
          alert('Apple login failed. Please try again later');
        });

      console.log('🚀  loginAuth:', loginAuth.data);
    } catch (e) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // Handle that the user canceled the sign-in flow
      } else {
        // Handle other errors
        console.log('🚀  error:', e);
        // alert('Apple login failed. Please try again later');
      }
    }
  };

  return (
    <>
      {/* Your Custom Button */}

      <TouchableOpacity
        onPress={() => handlePress('apple')}
        style={{
          backgroundColor: '#e9eef3',
          padding: 16,
          borderRadius: 10,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Ionicons name={'logo-apple'} size={20} color={'black'} />
          <Text
            style={{
              marginLeft: 6,
              color: 'black',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Continue with Apple
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
