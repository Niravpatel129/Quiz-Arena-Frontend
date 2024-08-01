import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

const AvatarSelection = ({
  freeAvatars,
  lockedAvatars,
  selectedAvatar,
  setSelectedAvatar,
}) => {
  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        Owned Avatars
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {freeAvatars.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedAvatar(avatar)}
          >
            <View style={{ alignItems: "center", margin: 10 }}>
              <Image
                cachePolicy="memory-disk"
                source={{ uri: avatar }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Text
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        Locked Avatars
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {lockedAvatars.map((avatar, index) => (
          <View key={index} style={{ alignItems: "center", margin: 10 }}>
            <Image
              source={{ uri: avatar }}
              style={{ width: 60, height: 60, borderRadius: 30, opacity: 0.5 }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default AvatarSelection;
