import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import capitalizeFirstLetter from "../../../helpers/capitalizeFirstLetter";
import formatLastActive from "../../../helpers/formatLastActive";
import { calculateExp } from "../../../helpers/calculateExp";

export default function RenderKing({ currentFeederKing, categoryName }) {
  const feederKing = currentFeederKing[0];
  const previousFeederKing = currentFeederKing[1];

  return (
    <View
      style={{
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3586ff", // Adjusted to match Figma design
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        width: "90%", // Adjusted width to make it more responsive
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: 18,
              color: "#ffca28", // Highest Scorer color
              marginBottom: 5,
            }}
          >
            Highest Score: {feederKing.scoreAchieved}
          </Text>
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: 22,
              color: "#fff",
            }}
          >
            {capitalizeFirstLetter(feederKing.userDetails.username)}
          </Text>
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: 16,
              color: "#fff",
            }}
          >
            {categoryName}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <CountryFlag
              isoCode={feederKing.userDetails.profile.country}
              size={20}
            />
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: 16,
                color: "#fff",
                marginLeft: 5,
              }}
            >
              {feederKing.userDetails.profile.countryName}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: feederKing.userDetails.profile.avatar,
            }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              marginBottom: 5,
            }}
          />
          <View
            style={{
              backgroundColor: "#ffd700", // Level background color
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-regular",
                fontSize: 14,
                color: "#000",
              }}
            >
              Level{" "}
              {calculateExp(feederKing.userDetails.profile.experience || 0)}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          backgroundColor: "#fff",
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "poppins-semiBold",
            fontSize: 16,
            color: "#0074da",
          }}
        >
          Rating: {feederKing.userDetails.profile.rating || 1200}
        </Text>
      </View>

      {previousFeederKing &&
        previousFeederKing.userDetails.username !==
          feederKing.userDetails.username && (
          <>
            <Text
              style={{
                fontFamily: "poppins-semiBold",
                fontSize: 14,
                textAlign: "center",
                color: "#fff",
                marginTop: 10,
              }}
            >
              Seat Taken from{" "}
              {capitalizeFirstLetter(previousFeederKing.userDetails.username)}
              <CountryFlag
                style={{
                  marginLeft: 6,
                }}
                isoCode={
                  previousFeederKing.userDetails.profile?.country || "na"
                }
                size={13}
              />
            </Text>
            <Text
              style={{
                fontFamily: "poppins-semiBold",
                fontSize: 14,
                textAlign: "center",
                color: "lightgray",
              }}
            >
              {formatLastActive(
                feederKing?.updatedAt || previousFeederKing?.updatedAt
              )}
            </Text>
          </>
        )}
    </View>
  );
}
