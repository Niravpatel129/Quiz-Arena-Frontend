import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { getLocales } from 'expo-localization';
import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { newRequest } from '../../api/newRequest';
import { useAuth } from '../../context/auth/AuthContext';
import { useSocket } from '../../context/socket/SocketContext';
import upload from '../../helpers/upload';

export default function SignUpLogin({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [showUsername, setShowUsername] = React.useState(false);
  const socket = useSocket();
  const { signIn } = useAuth();
  const [avatarUri, setAvatarUri] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);

  useEffect(() => {
    const getEmail = async () => {
      const email = await AsyncStorage.getItem('email');
      if (!email) return;
      if (email === 'null') return;
      if (email === '') return;

      setEmail(email || '');
    };

    getEmail();
  }, []);

  useEffect(() => {
    const getEmail = async () => {
      const password = await AsyncStorage.getItem('password');
      if (!password) return;
      if (password === 'null') return;
      if (password === '') return;

      setPassword(password || '');
    };

    getEmail();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const newUri = result.assets[0].uri;
    console.log('🚀  newUri:', newUri);

    if (!result.canceled) {
      setAvatarUri(newUri);
      const url = await upload(newUri);
      setAvatar(url);
    }
  };

  const handleLogin = () => {
    AsyncStorage.setItem('email', email);
    AsyncStorage.setItem('password', password);
    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }

    newRequest
      .post('/auth/login', {
        email: email,
        password: password || 'password',
        username: username || null,
        country: getLocales()[0]?.regionCode?.toLowerCase(),
        profile: {
          avatar: avatar || null,
        },
      })
      .then((response) => {
        console.log('🚀  response:', response);

        if (!response.data.user.username) {
          setShowUsername(true);
          return;
        }

        signIn(response.data.token);
        socket.ConnectSocket();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Categories' }],
        });
      })
      .catch((error) => {
        console.log('login failed :(');
        if (username) {
          alert('Username already taken');
          return;
        }

        console.log('error', error.message);
        alert('please try again');
      });
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{
            margin: 20,
            height: '100%',
          }}
        >
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../assets/logo.png')}
              style={{
                width: 180,
                height: 180,
                resizeMode: 'contain',
                marginBottom: 10,
              }}
            />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginBottom: 20,
                  color: 'white',
                  fontFamily: 'Inter-Bold',
                  fontWeight: 'bold',
                }}
              >
                {showUsername ? 'Create your profile' : 'Sign up or login'}
              </Text>
              {showUsername && (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      pickImage();
                    }}
                    style={{
                      marginBottom: 20,
                      width: 200,
                      height: 200,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#DDD',
                      overflow: 'hidden',
                    }}
                  >
                    {avatarUri ? (
                      <Image source={{ uri: avatarUri }} style={{ width: 200, height: 200 }} />
                    ) : (
                      <Image
                        source={{
                          uri: 'https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=',
                        }}
                        style={{ width: 200, height: 200 }}
                      />
                    )}
                  </TouchableOpacity>
                </>
              )}
              {/* Input Username */}
              {showUsername ? (
                <View
                  style={{
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <Ionicons
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 10,
                      zIndex: 1,
                    }}
                    name={'person'}
                    size={30}
                    color={'#516696'}
                  />
                  <TextInput
                    style={{
                      padding: 10,
                      // backgroundColor: 'white',
                      borderRadius: 6,
                      marginBottom: 10,
                      fontSize: 20,
                      paddingVertical: 17,
                      backgroundColor: '#e9eef3',
                    }}
                    placeholder='Username'
                    onChangeText={setUsername}
                    value={username}
                    onSubmitEditing={handleLogin}
                  />
                </View>
              ) : (
                <>
                  {/* Input Email */}
                  <View
                    style={{
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    <Ionicons
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 10,
                        zIndex: 1,
                      }}
                      name={'person'}
                      size={30}
                      color={'#516696'}
                    />
                    <TextInput
                      style={{
                        padding: 10,
                        backgroundColor: '#e9eef3',
                        borderRadius: 6,
                        marginBottom: 10,
                        fontSize: 20,
                        paddingVertical: 17,
                      }}
                      placeholder='Email'
                      keyboardType='email-address'
                      onChangeText={setEmail}
                      value={email}
                    />
                  </View>
                  {/* Input Password */}
                  <View
                    style={{
                      position: 'relative',
                      width: '100%',
                    }}
                  >
                    <Ionicons
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 10,
                        zIndex: 1,
                      }}
                      name={'lock-closed'}
                      size={30}
                      color={'#516696'}
                    />
                    <TextInput
                      style={{
                        padding: 10,
                        backgroundColor: '#e9eef3',
                        borderRadius: 6,
                        marginBottom: 10,
                        fontSize: 20,
                        paddingVertical: 17,
                      }}
                      placeholder='Password'
                      secureTextEntry
                      onChangeText={setPassword}
                      value={password}
                      onSubmitEditing={handleLogin}
                    />
                  </View>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: 'white',
                        marginBottom: 20,
                      }}
                    >
                      Forgot your password?
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {/* bottom of the page submit button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#e9eef3',
                  padding: 18,
                  borderRadius: 10,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 40,
                }}
                onPress={() => handleLogin()}
              >
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 6,
                      color: '#516696',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Continue
                  </Text>
                  <Ionicons name={'arrow-forward'} size={20} color={'#516696'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
