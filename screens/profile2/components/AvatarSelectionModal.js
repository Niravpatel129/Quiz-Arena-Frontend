import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

const AvatarSelectionModal = ({ visible, onClose, onSelectAvatar }) => {
  const avatars = [
    "https://example.com/avatar1.png",
    "https://example.com/avatar2.png",
    "https://example.com/avatar3.png",
    // Add more avatar URLs as needed
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.avatarContainer}>
            {avatars.map((avatar, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onSelectAvatar(avatar)}
              >
                <Image source={{ uri: avatar }} style={styles.avatar} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
});

export default AvatarSelectionModal;
