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
                style={styles.modalTextInput}
                placeholder='Enter new username'
                value={newUsername}
                onChangeText={setNewUsername}
              />
              <Button title='Save' onPress={handleSave} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Add a semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextInput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UsernameModal;
