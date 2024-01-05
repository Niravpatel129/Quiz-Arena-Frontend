import axios from 'axios';
import { keys } from '../keys';

let FileSystem;
try {
  FileSystem = require('expo-file-system');
} catch (error) {
  FileSystem = null;
}

const fileToDataURL = async (fileUri) => {
  if (!FileSystem) {
    throw new Error('FileSystem is not available');
  }

  const base64 = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const mimeType = 'image/png'; // Change this according to your file's MIME type
  return `data:${mimeType};base64,${base64}`;
};

const upload = async (file) => {
  const uploadUrl = `https://api.cloudinary.com/v1_1/gamercoach/image/upload?api_key=${keys.cloudinary}`;

  let dataURL;
  if (FileSystem) {
    // Use fileToDataURL if FileSystem is available (React Native)
    dataURL = await fileToDataURL(file);
  } else {
    // In web environment, assume 'file' is already a Blob or File object
    dataURL = file;
  }

  const data = new FormData();
  data.append('file', dataURL);
  data.append('upload_preset', 'gamercoach');

  try {
    const response = await axios.post(uploadUrl, data);

    const { url } = response.data;
    console.log('🚀  url:', url);

    return url;
  } catch (error) {
    console.error('🚀  error:', error);
  }
};

export default upload;
