import React from "react";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";

const leaderboardData = [
  {
    username: "William James",
    country: "US",
    countryName: "United States",
    score: 25532,
    avatar: "https://via.placeholder.com/50", // Placeholder image URL
  },
  {
    username: "John David",
    country: "CA",
    countryName: "Canada",
    score: 22000,
    avatar: "https://via.placeholder.com/50", // Placeholder image URL
  },
  {
    username: "Richard Michael",
    country: "CA",
    countryName: "Canada",
    score: 21560,
    avatar: "https://via.placeholder.com/50", // Placeholder image URL
  },
];

export default function Leaderboard() {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "poppins-semiBold",
          fontSize: 20,
          color: "#0074da",
          marginBottom: 10,
        }}
      >
        Leaderboard
      </Text>
      {leaderboardData.map((player, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            padding: 10,
            borderRadius: 10,
            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e9e9e9",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "poppins-semiBold",
                fontSize: 18,
                color: "#0074da",
                marginRight: 10,
              }}
            >
              {index + 1}
            </Text>
            <Image
              source={{
                uri: player.avatar,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <View>
              <Text
                style={{
                  fontFamily: "poppins-semiBold",
                  fontSize: 16,
                  color: "#000",
                }}
              >
                {player.username}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CountryFlag isoCode={player.country} size={20} />
                <Text
                  style={{
                    fontFamily: "poppins-regular",
                    fontSize: 14,
                    color: "#666",
                    marginLeft: 5,
                  }}
                >
                  {player.countryName}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: 16,
              color: "#0074da",
            }}
          >
            {player.score}
          </Text>
        </View>
      ))}
    </View>
  );
}
