import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'native-base';
import React from 'react';
import { Alert, Linking, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../api/newRequest';
import { useAuth } from '../context/auth/AuthContext';

export default function ProfileEditScreen() {
  const auth = useAuth();
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      await newRequest.delete('/users');

      alert('Account deleted, logging out...');

      auth.signOut();

      //   logout user
    } catch (err) {
      console.log(err);
    }
  };

  const showAlert = () =>
    Alert.alert(
      'Are you sure you want to delete your account?',
      'This action cannot be undone.',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: handleDelete,
          style: 'destructive', // This gives the button a destructive action style
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert('This alert was dismissed by tapping outside of the alert dialog.'),
      },
    );

  return (
    <View style={{}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name='ios-arrow-back' size={30} color='black' style={{ margin: 20 }} />
      </TouchableOpacity>
      <View
        style={{
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 700,
            marginTop: 20,
            width: '100%',
            textAlign: 'center',
          }}
        >
          Advanced Settings
        </Text>

        <View>
          <TouchableOpacity
            style={{
              marginTop: 20,
              // backgroundColor: '#e96f6f',
              borderWidth: 1,
              padding: 10,
              width: 200,
              borderRadius: 5,
            }}
            onPress={() => {
              // are you sure

              showAlert();
            }}
          >
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              // backgroundColor: '#e96f6f',
              borderWidth: 1,
              padding: 10,
              width: 200,
              borderRadius: 5,
            }}
            onPress={() => {
              // auth.signOut();
              navigation.navigate('SignUpLogin');
            }}
          >
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              // backgroundColor: '#f96363',
              padding: 10,
              width: 200,
              borderWidth: 1,
              borderRadius: 5,
            }}
            onPress={() => {
              Linking.openURL('https://quizarena.gg/privacy');
            }}
          >
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Terms of Use
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
