import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { newRequest } from '../api/newRequest';
import upload from '../helpers/upload';

// Custom hook for picking and automatically uploading an image
export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null); // To store the URL of the uploaded image

  const pickAndUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);

      try {
        const url = await upload(uri);
        await newRequest.put(`/users`, {
          profile: {
            avatar: url,
          },
        });
        setUploadUrl(url); // Save the URL of the uploaded image
        return { imageUri: uri, uploadUrl: url }; // Return both the local URI and the URL of the uploaded image
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Upload Failed', 'Please try again.');
      }
    }

    return null; // Return null if no image was picked or upload failed
  };

  return {
    imageUri,
    uploadUrl,
    pickAndUploadImage,
  };
};
