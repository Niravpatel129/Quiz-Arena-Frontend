import React from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";

const AvatarModal = ({ visible, onClose, onSelectAvatar, avatars }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onSelectAvatar(item)}
      style={styles.avatarContainer}
    >
      <Image
        cachePolicy="memory-disk"
        source={{ uri: item.uri }}
        style={[styles.avatarImage, item.locked && styles.lockedAvatar]}
      />
      <Text style={styles.avatarText}>
        {item.locked ? "Locked" : "Unlocked"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Choose your avatar</Text>
        <FlatList
          data={avatars}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.avatarList}
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderWidth: 10,
    borderColor: "#3b3b3b",
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: "#3b3b3b",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#3b3b3b",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  avatarList: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    margin: 10,
    alignItems: "center",
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#3b3b3b",
    marginBottom: 10,
  },
  lockedAvatar: {
    opacity: 0.5,
  },
  avatarText: {
    color: "#3b3b3b",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#3b3b3b",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AvatarModal;
