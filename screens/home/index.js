import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { newRequest } from '../../api/newRequest';
import LoginWithFacebook from '../../components/LoginWithFacebook';
import { useSocket } from '../../context/socket/SocketContext';

export default function HomeScreen({ navigation }) {
  const [loginInput, setLoginInput] = useState('nirav2');

  const socket = useSocket();

  useEffect(() => {
    const getUsername = async () => {
      const username = await AsyncStorage.getItem('username');
      if (!username) return;
      if (username === 'null') return;
      if (username === '') return;

      setLoginInput(username || '');
    };

    getUsername();
  }, []);

  const NavigateToMainPage = () => {
    AsyncStorage.setItem('username', loginInput);

    newRequest
      .post('/auth/login', {
        username: loginInput,
        password: 'password',
      })
      .then((response) => {
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
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            fontFamily: 'Inter-Bold',
            fontWeight: 700,
          },
        ]}
      >
        Login
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={loginInput}
        onChangeText={setLoginInput}
      />
      <Pressable style={styles.button} title='login' onPress={() => NavigateToMainPage()}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <LoginWithFacebook />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: 32,
    margin: 10,
  },
  input: {
    width: '80%',
    padding: 5,
    margin: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  button: {
    margin: 20,
    width: '80%',
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#f194ff',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 700,
    userSelect: 'none',
  },
});
