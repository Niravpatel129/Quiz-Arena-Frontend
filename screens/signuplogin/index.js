import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { getLocales } from 'expo-localization';
import React, { useEffect } from 'react';
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
  const passwordInputRef = React.useRef(null);

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
    if (!newUri) return;
    setAvatarUri(newUri);
    const url = await upload(newUri);
    console.log('🚀  url:', url);
    setAvatar(url);
  };

  const handleLogin = () => {
    AsyncStorage.setItem('email', email);
    AsyncStorage.setItem('password', password);
    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }

    if (showUsername && (username.length < 3 || username.length > 10)) {
      alert('username must be between 3 and 10 characters');
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
        if (response.data?.isNewUser) {
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
        console.log('🚀  error:', error);
        console.log('login failed :(');
        if (username) {
          alert('Username already taken');
          return;
        }

        console.log('error', error.message);
        alert(error?.response?.data?.msg || 'Login failed, please try again later');
      });
  };

  return (
    <LinearGradient colors={['#EC80B4', '#3F95F2']} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={{
              marginTop: 20,
              marginLeft: 20,
            }}
            name={'arrow-back'}
            size={30}
            color={'white'}
          />
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps='handled'
          >
            <View
              style={{
                padding: 20,
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
                    fontWeight: 700,
                    marginBottom: 20,
                    color: 'white',
                    fontFamily: 'Inter-Bold',
                    fontWeight: 700,
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
                            headers: {
                              Accept: '*/*',
                            },
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
                      returnKeyType='continue'
                      style={{
                        padding: 10,
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
                        onChangeText={setEmail}
                        value={email}
                        returnKeyType='next'
                        onSubmitEditing={() => passwordInputRef.current?.focus()}
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
                        ref={passwordInputRef} // Use the ref here
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
                        returnKeyType='done'
                      />
                    </View>
                    {/* <TouchableOpacity>
                      <Text
                        style={{
                          color: 'white',
                          marginBottom: 20,
                        }}
                      >
                        Forgot your password?
                      </Text>
                    </TouchableOpacity> */}
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
                        fontWeight: 700,
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
