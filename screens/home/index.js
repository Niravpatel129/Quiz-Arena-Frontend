import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { newRequest } from '../../api/newRequest';
import { useSocket } from '../../context/socket/SocketContext';

export default function HomeScreen({ navigation }) {
  const [loginInput, setLoginInput] = useState('nirav2');
  const socket = useSocket();

  useEffect(() => {
    const getUsername = async () => {
      const username = await AsyncStorage.getItem('username');
      console.log('🚀  username:', username);
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
        console.log('response', response);
        navigation.navigate('Categories');
      })
      .catch((error) => {
        console.log('error', error);
        alert('Error logging in', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={loginInput}
        onChangeText={setLoginInput}
      />

      <Pressable style={styles.button} title='login' onPress={() => NavigateToMainPage()}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
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
    fontSize: '2rem',
    margin: '1rem',
  },
  input: {
    width: '80%',
    padding: '1rem',
    margin: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  button: {
    margin: 10,
    width: '80%',
    padding: 10,
    borderRadius: '5px',
    backgroundColor: '#f194ff',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    userSelect: 'none',
  },
});
