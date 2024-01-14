import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ImageDisplay = ({ sourceUri }) => {
  return (
    <Image
      source={{
        uri: sourceUri,
        headers: {
          Accept: '*/*',
        },
      }}
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default ImageDisplay;
