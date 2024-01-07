import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Animated, TouchableOpacity } from 'react-native';
import { newRequest } from '../../api/newRequest';
import upload from '../../helpers/upload';

const AvatarPicker = ({ defaultImage, disablePress }) => {
  const [avatar, setAvatar] = useState(null);
  const scaleAnim = new Animated.Value(0.5);
  const opacityAnim = new Animated.Value(0); // Initial opacity value for fade-in animation

  const onImageLoad = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

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
        // backgroundColor: '#DDD',
        overflow: 'hidden',
      }}
    >
      {avatar ? (
        <Animated.Image
          source={{ uri: avatar }}
          style={{
            width: 200,
            height: 200,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          onLoad={onImageLoad}
        />
      ) : (
        <Animated.Image
          source={{
            uri: defaultImage,
          }}
          style={{
            width: 200,
            height: 200,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          onLoad={onImageLoad}
        />
      )}
    </TouchableOpacity>
  );
};

export default AvatarPicker;
