import React, { useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';

const UsernameModal = ({ visible, onClose, onSave, defaultUsername }) => {
  const [newUsername, setNewUsername] = useState(defaultUsername);

  const handleSave = () => {
    onSave(newUsername);
    onClose(); // Close the modal after saving
  };

  return (
    <Modal animationType='slide' transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalView}>
              <TextInput
                maxLength={8}
                style={styles.modalTextInput}
                placeholder='Enter new username'
                value={newUsername}
                onChangeText={setNewUsername}
                placeholderTextColor='#C7C7CD' // iOS-style placeholder text color
              />
              <View style={styles.buttonContainer}>
                <Button title='Save' onPress={handleSave} color='#007AFF' />
                {/* iOS-style button color */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 14, // iOS-style border radius
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTextInput: {
    height: 40,
    width: 250, // Slightly wider to match iOS style
    margin: 12,
    borderBottomWidth: 1, // iOS-style underline text input
    borderColor: '#C7C7CD', // iOS-style border color
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%', // Ensure the button is full-width
    borderRadius: 14, // iOS-style border radius for buttons
  },
});

export default UsernameModal;
