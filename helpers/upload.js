import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';
import { keys } from '../keys';

let FileSystem;
try {
  FileSystem = require('expo-file-system');
} catch (error) {
  FileSystem = null;
}

const convertToJPEG = async (fileUri) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    fileUri,
    [
      {
        resize: {
          width: 250,
          height: 250,
        },
      },
    ],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
  );
  return manipResult.uri;
};

const fileToDataURL = async (fileUri) => {
  if (!FileSystem) {
    throw new Error('FileSystem is not available');
  }

  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return `data:image/png;base64,${base64}`;
};

const upload = async (fileUri) => {
  const uploadUrl = `https://api.cloudinary.com/v1_1/gamercoach/image/upload?api_key=${keys.cloudinary}`;

  const JPEG_URI = await convertToJPEG(fileUri);
  const dataURL = await fileToDataURL(JPEG_URI);

  const data = new FormData();
  data.append('file', dataURL);
  data.append('upload_preset', 'elo_mastery');

  try {
    const response = await axios.post(uploadUrl, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    const { url } = response.data;
    console.log('🚀  url:', url);
    return url;
  } catch (error) {
    console.log('🚀  error:', error);
    console.error('Error uploading image:', error.message);
  }
};

export default upload;
