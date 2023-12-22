import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { newRequest } from '../../api/newRequest';

export default function HomeScreen({ navigation }) {
  const [loginInput, setLoginInput] = useState(localStorage.getItem('username') || 'nirav2');

  const NavigateToMainPage = () => {
    localStorage.setItem('username', loginInput);

    newRequest
      .post('/auth/login', {
        username: loginInput,
        password: 'password',
      })
      .then((response) => {
        console.log('response', response);
        navigation.navigate('Categories');
      })
      .catch((error) => {
        console.log('error', error);
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
    margin: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    margin: '1rem',
    width: '80%',
    padding: '1rem',
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
