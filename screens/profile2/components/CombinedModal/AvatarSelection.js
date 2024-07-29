import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";

const AvatarSelection = ({
  freeAvatars,
  lockedAvatars,
  selectedAvatar,
  setSelectedAvatar,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Owned Avatars</Text>
      <View style={styles.avatarSection}>
        {freeAvatars.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedAvatar(avatar)}
          >
            <View style={styles.avatarWrapper}>
              <Image
                cachePolicy="memory-disk"
                source={{ uri: avatar }}
                style={styles.avatarOption}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Locked Avatars</Text>
      <View style={styles.avatarSection}>
        {lockedAvatars.map((avatar, index) => (
          <View key={index} style={styles.avatarWrapper}>
            <Image source={{ uri: avatar }} style={styles.avatarOptionLocked} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  avatarSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  sectionTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  avatarWrapper: {
    alignItems: "center",
    margin: 10,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarOptionLocked: {
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.5,
  },
});

export default AvatarSelection;
