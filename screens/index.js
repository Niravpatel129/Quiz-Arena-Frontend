import { Text } from 'native-base';
import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { newRequest } from '../api/newRequest';

export default function ProfileEditScreen() {
  const handleDelete = async () => {
    try {
      await newRequest.delete('/users/');

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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 20,
          width: '100%',
          textAlign: 'center',
        }}
      >
        More Options
      </Text>

      <View>
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: '#e96f6f',
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
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
