import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
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
import { useSocket } from '../../context/socket/SocketContext';

export default function SignUpLogin({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [showUsername, setShowUsername] = React.useState(false);
  const socket = useSocket();

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

  const handleLogin = () => {
    AsyncStorage.setItem('email', email);
    AsyncStorage.setItem('password', password);

    newRequest
      .post('/auth/login', {
        email: email,
        password: password || 'password',
        username: username || null,
      })
      .then((response) => {
        console.log('🚀  response:', response);
        if (!response.data.user.username) {
          setShowUsername(true);
          return;
        }

        socket.ConnectSocket();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Categories' }],
        });
      })
      .catch((error) => {
        console.log('login failed :(');
        console.log('error', error.message);
        alert('Error logging in', error);
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
                {showUsername ? 'Create a username' : 'Sign up or login'}
              </Text>
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
