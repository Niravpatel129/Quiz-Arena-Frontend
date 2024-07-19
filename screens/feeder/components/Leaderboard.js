import React from "react";
import { Image } from "expo-image";
import { Text, View, TouchableOpacity } from "react-native";
import CountryFlag from "react-native-country-flag";

const leaderboardData = [
  {
    username: "William James",
    country: "US",
    countryName: "United States",
    score: 11220,
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg", // Placeholder image URL
  },
  {
    username: "John David",
    country: "CA",
    countryName: "Canada",
    score: 11000,
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/June_odd-eyed-cat_cropped.jpg", // Placeholder image URL
  },
  {
    username: "Richard Michael",
    country: "CA",
    countryName: "Canada",
    score: 11220,
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Black_white_cat_on_fence.jpg/220px-Black_white_cat_on_fence.jpg", // Placeholder image URL
  },
];

export default function Leaderboard() {
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
            fontSize: 16, // decreased by 20%
            color: "#0074da",
          }}
        >
          Leaderboard
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: 11, // decreased by 20%
              color: "#2CC672",
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
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
            backgroundColor: "#f9f9f9",
            borderWidth: 1,
            borderColor:
              index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "poppins-semiBold",
                fontSize: 14, // decreased by 20%
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
                    fontSize: 13, // decreased by 20%
                    color: "#000",
                    marginRight: 5,
                  }}
                >
                  {player.username}
                </Text>
                <CountryFlag isoCode={player.country} size={12} />
              </View>
            </View>
          </View>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: 13, // decreased by 20%
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
