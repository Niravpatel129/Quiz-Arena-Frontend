import React from "react";
import { Image } from "expo-image";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CountryFlag from "react-native-country-flag";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

const TopPlayersModal = ({ isVisible, onClose, leaderboard }) => {
  const navigation = useNavigation();
  // shows the top 20 players
  const top20Players = leaderboard.slice(0, 20);

  const handleProfileNavigation = (userId) => {
    onClose();
    navigation.navigate("PublicProfile", { userId });
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 20,
          maxHeight: "60%",
          width: "90%",
          alignSelf: "center",
          paddingTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={onClose}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1,
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#0074da" />
        </TouchableOpacity>
        <ScrollView>
          {top20Players.map((player, index) => {
            const { userDetails, scoreAchieved, _id } = player;
            const { profile, username } = userDetails || {};
            const { avatar, country } = profile || {};

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleProfileNavigation(_id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#f9f9f9",
                  borderWidth: 1,
                  borderColor:
                    index === 0
                      ? "#FFD700"
                      : index === 1
                      ? "#C0C0C0"
                      : index === 2
                      ? "#CD7F32"
                      : "#0074da",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "poppins-semiBold",
                      fontSize: 14,
                      color: "#0074da",
                      marginRight: 10,
                    }}
                  >
                    {index + 1}
                  </Text>
                  <Image
                    source={{
                      uri: avatar || "https://example.com/default-avatar.png",
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 25,
                      marginRight: 10,
                    }}
                  />
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontFamily: "poppins-semiBold",
                          fontSize: 13,
                          color: "#000",
                          marginRight: 5,
                        }}
                      >
                        {username || "Unknown"}
                      </Text>
                      <CountryFlag isoCode={country || "US"} size={12} />
                    </View>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: "poppins-semiBold",
                    fontSize: 13,
                    color: "#0074da",
                  }}
                >
                  {scoreAchieved || 0}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default TopPlayersModal;
