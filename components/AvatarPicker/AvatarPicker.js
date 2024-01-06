import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity } from 'react-native';
import { newRequest } from '../../api/newRequest';
import upload from '../../helpers/upload';

const AvatarPicker = ({ defaultImage, disablePress }) => {
  const [avatar, setAvatar] = useState(null);

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
      setAvatar(newUri);
      uploadImage(newUri); // Simulate API call
    }
  };

  const uploadImage = async (uri) => {
    try {
      const url = await upload(uri);

      const res = await newRequest.put(`/users`, {
        profile: {
          avatar: url,
        },
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Upload Failed', 'Please try again.');
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (disablePress) return;

        pickImage();
      }}
      style={{
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDD',
        overflow: 'hidden',
      }}
    >
      {avatar ? (
        <Image source={{ uri: avatar }} style={{ width: 200, height: 200 }} />
      ) : (
        <Image
          source={{
            uri:
              defaultImage ||
              'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVubnklMjBjYXR8ZW58MHx8MHx8fDA%3D',
          }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default AvatarPicker;
