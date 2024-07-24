import React, { useState } from "react";
import { Image } from "expo-image";
import { Text, View, TouchableOpacity } from "react-native";
import CountryFlag from "react-native-country-flag";
import TopPlayersModal from "./TopPlayersModal";

export default function Leaderboard({ leaderboard }) {
  const [isModalVisible, setModalVisible] = useState(false);

  // Display only the bottom 3 players after the first one
  const bottomPlayers = leaderboard.slice(1, 4);

  return (
    <View
      style={{
        width: "115%",
        backgroundColor: "transparent",
        borderRadius: 10,
        padding: 20,
        marginBottom: -30,
      }}
    >
      <TopPlayersModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        leaderboard={leaderboard}
      />
      <View
        style={{
          backgroundColor: "#DCEDFD",
          padding: 10,
          borderRadius: 14,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "poppins-semiBold",
            fontSize: 16,
            color: "#0074da",
          }}
        >
          Leaderboard
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: 11,
              color: "#2CC672",
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {bottomPlayers.map((player, index) => {
        const { userDetails, scoreAchieved } = player;
        const { profile, username } = userDetails || {};
        const { avatar, country } = profile || {};

        return (
          <View
            key={index}
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
                index === 0 ? "#C0C0C0" : index === 1 ? "#CD7F32" : "#0074da",
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
                {index + 2}
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          </View>
        );
      })}
    </View>
  );
}
