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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3F95F2",
        padding: 20,
        borderRadius: 10,
        width: "105%",
        marginTop: -5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
              fontSize: 14,
              color: "#ffca28",
              marginBottom: 5,
            }}
          >
            Highest Score: {feederKing.scoreAchieved}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-semiBold",
                fontSize: 18,
                color: "#fff",
                marginRight: 5,
              }}
            >
              {capitalizeFirstLetter(feederKing.userDetails.username)}
            </Text>
            <CountryFlag
              isoCode={feederKing.userDetails.profile.country}
              size={18}
            />
          </View>
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: 14,
              color: "#fff",
              marginLeft: 5,
            }}
          >
            {feederKing.userDetails.profile.countryName}
          </Text>
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: 14,
              color: "#fff",
              marginTop: -10,
              position: "relative",
              bottom: 10,
            }}
          >
            {categoryName}
          </Text>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
              marginTop: 5,
              marginLeft: 0,
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              position: "relative",
              bottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "poppins-semiBold",
                fontSize: 14,
                color: "#0074da",
              }}
            >
              Rating: {feederKing.userDetails.profile.rating || 1200}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginLeft: 10 }}>
          <Image
            source={{
              uri: feederKing.userDetails.profile.avatar,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginBottom: 5,
            }}
          />
          <View
            style={{
              backgroundColor: "#ffd700",
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 5,
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
