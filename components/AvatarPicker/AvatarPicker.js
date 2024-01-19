import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { newRequest } from '../../api/newRequest';
import upload from '../../helpers/upload';

const AvatarPicker = ({ defaultImage, disablePress }) => {
  const [avatar, setAvatar] = useState(null);
  const scaleAnim = new Animated.Value(0.5);
  const opacityAnim = new Animated.Value(0);

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

    if (!result.assets || result.assets.length <= 0) return;

    const newUri = result.assets[0].uri;

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const url = await upload(uri);

      await newRequest.put(`/users`, {
        profile: {
          avatar: url,
        },
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Upload Failed', 'Please try again.');
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
          source={{
            uri: avatar,
            headers: {
              Accept: '*/*',
            },
          }}
          style={{
            width: 200,
            height: 200,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          onLoad={onImageLoad}
          onError={(error) => {
            console.log('🚀 Error loading image:', error);
          }}
        />
      ) : (
        <Animated.Image
          source={{
            uri: defaultImage,
            headers: {
              Accept: '*/*',
            },
          }}
          style={{
            width: 200,
            height: 200,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          onError={(error) => {
            console.log('🚀 Error loading image:', error);
          }}
          onLoad={onImageLoad}
        />
      )}
    </TouchableOpacity>
  );
};

export default AvatarPicker;
