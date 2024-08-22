import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { RFValue } from "react-native-responsive-fontsize";
import { calculateExp } from "../../../helpers/calculateExp";
import capitalizeFirstLetter from "../../../helpers/capitalizeFirstLetter";
import DividerHeader from "./DividerHeader";

export default function UserProfile({ userData }) {
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          borderRadius: 16,
          shadowColor: "#3E75D9",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Avatar, Username, Country Flag, Experience, Coins */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              cachePolicy="memory-disk"
              source={{
                uri:
                  userData?.profile?.avatar ||
                  "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Faxoltol-profile-pic.jpg?alt=media&token=1e49a0a3-9d7e-4d0c-bb75-a401c3f14825",
              }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#F8D2E6",
                marginRight: 10,
              }}
            />
          </TouchableOpacity>

          <View style={{ alignItems: "flex-start" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "poppins-bold",
                  fontSize: 18,
                  color: "#000",
                }}
              >
                {capitalizeFirstLetter(userData?.username)}
              </Text>
              {userData?.profile?.country && (
                <CountryFlag isoCode={userData.profile.country} size={14} />
              )}
            </View>

            <Text
              style={{
                fontFamily: "poppins-semiBold",
                fontSize: 14,
                color: "#000",
                marginBottom: 5,
              }}
            >
              Level {calculateExp(userData?.profile?.experience || 0)}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="ios-cash" size={20} color="#FFD700" />
              <Text
                style={{
                  color: "#000",
                  fontFamily: "poppins-semiBold",
                  fontSize: RFValue(12),
                }}
              >
                {/* Placeholder value for Coins */}
                1000
              </Text>
            </View>
          </View>
        </View>

        {/* Arena Rating, Energy */}
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 20,
              marginBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Ionicons name="trophy" size={20} color="#FDD92C" />
              <Text
                style={{
                  // color: "#3F95F2",
                  fontFamily: "poppins-semiBold",
                  fontSize: RFValue(12),
                }}
              >
                {userData.averageRating || 0}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="flash" size={20} color="#32CD32" />
            <Text
              style={{
                color: "#000", // Changed to black for better visibility
                fontFamily: "poppins-semiBold",
                fontSize: RFValue(12),
              }}
            >
              {/* Placeholder value for Energy */}
              10/20
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
