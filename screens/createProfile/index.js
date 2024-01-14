import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
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
import { useSocket } from '../../context/socket/SocketContext';
import upload from '../../helpers/upload';

export default function CreateProfile({ route, navigation }) {
  const { currentUsername, currentAvatar } = route.params;

  const [username, setUsername] = React.useState(currentUsername || '');
  const socket = useSocket();
  const [avatarUri, setAvatarUri] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);

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
    try {
      // username in characters 3 letter and max 10

      if (username.length < 3 || username.length > 10) {
        alert('username must be between 3 and 10 characters');
        return;
      }

      newRequest.put('/users', {
        username: username,
        profile: {
          avatar: avatar,
        },
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Categories' }],
      });
      socket.ConnectSocket();
    } catch (e) {
      alert('your username is already taken');
    }
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
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
                  Create your profile
                </Text>
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
                      <Image
                        source={{
                          uri: avatarUri,
                          headers: {
                            Accept: '*/*',
                          },
                        }}
                        style={{ width: 200, height: 200 }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri:
                            currentAvatar ||
                            'https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=',
                        }}
                        style={{ width: 200, height: 200 }}
                      />
                    )}
                  </TouchableOpacity>
                </>
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
