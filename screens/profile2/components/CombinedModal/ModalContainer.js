import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AvatarSelection from './AvatarSelection';
import ColorPicker from './ColorPicker';
import { freeAvatars, lockedAvatars } from './optimizedAvatars';
import UsernameInput from './UsernameInput';
import { hsvToHex } from './utils'; // Import the utility function

const ModalContainer = ({
  visible,
  onClose,
  onSave,
  defaultUsername,
  defaultAvatar,
  defaultColor,
}) => {
  const [usernameInputVisible, setUsernameInputVisible] = useState(false);
  const [iconInputVisible, setIconInputVisible] = useState(false);
  const [newUsername, setNewUsername] = useState(defaultUsername);
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
  const [selectedColor, setSelectedColor] = useState(defaultColor || '#ffffff');
  const [error, setError] = useState('');
  const [avatarBackground, setAvatarBackground] = useState(defaultColor || '#ffffff');

  useEffect(() => {
    if (visible) {
      setNewUsername(defaultUsername);
      setSelectedAvatar(defaultAvatar);
      setSelectedColor(defaultColor || '#ffffff');
      setAvatarBackground(defaultColor || '#ffffff');
      setError('');
    }
  }, [visible, defaultUsername, defaultAvatar, defaultColor]);

  const handleSave = async () => {
    try {
      await onSave(selectedAvatar, newUsername, avatarBackground);

      setUsernameInputVisible(false);
      setIconInputVisible(false);
      setError('');
    } catch (e) {
      setError('This username is already taken.');
    }
  };

  const handleCancel = () => {
    setNewUsername(defaultUsername);
    setSelectedAvatar(defaultAvatar);
    setSelectedColor(defaultColor || '#ffffff');
    setAvatarBackground(defaultColor || '#ffffff');
    setUsernameInputVisible(false);
    setIconInputVisible(false);
    setError('');
  };

  const handleSetBackground = () => {
    if (
      typeof selectedColor === 'object' &&
      selectedColor.h !== undefined &&
      selectedColor.s !== undefined &&
      selectedColor.v !== undefined
    ) {
      const colorString = hsvToHex(selectedColor.h / 360, selectedColor.s, selectedColor.v); // Adjust HSV to the 0-1 range for conversion
      console.log('Set background button pressed. Selected color:', colorString);
      setAvatarBackground(colorString);
    } else {
      console.error('Invalid color format:', selectedColor);
    }
  };

  return (
    <Modal animationType='slide' transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={styles.modalViewContainer}>
            <View style={styles.modalView}>
              <View style={[styles.avatar, { backgroundColor: avatarBackground }]}>
                <Image
                  cachePolicy='memory-disk'
                  source={{ uri: selectedAvatar }}
                  style={styles.avatarImage}
                />
              </View>
              <UsernameInput
                newUsername={newUsername}
                setNewUsername={setNewUsername}
                usernameInputVisible={usernameInputVisible}
                error={error}
              />
              <View style={styles.buttonRow}>
                {usernameInputVisible || iconInputVisible ? (
                  <>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={handleCancel}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.saveButton]}
                      onPress={handleSave}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.changeButton}
                      onPress={() => setUsernameInputVisible(true)}
                    >
                      <Text style={styles.changeButtonText}>Change Username</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.changeButton}
                      onPress={() => setIconInputVisible(true)}
                    >
                      <Text style={styles.changeButtonText}>Change Icon</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.avatarContainer}>
                  <AvatarSelection
                    freeAvatars={freeAvatars}
                    lockedAvatars={lockedAvatars}
                    selectedAvatar={selectedAvatar}
                    setSelectedAvatar={setSelectedAvatar}
                  />
                </View>
              </ScrollView>
              <View style={styles.colorPickerContainer}>
                <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                <TouchableOpacity style={styles.setButton} onPress={handleSetBackground}>
                  <Text style={styles.buttonText}>Set Background</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalViewContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '70%',
  },
  modalView: {
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  changeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  changeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#d9534f',
  },
  saveButton: {
    backgroundColor: '#5cb85c',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  scrollViewContainer: {
    maxHeight: '50%',
    marginVertical: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  setButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default ModalContainer;
