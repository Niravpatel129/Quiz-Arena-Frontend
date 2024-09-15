// PublicProfile.js
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-toast-message";
import { newRequest } from "../../api/newRequest";
import formatLastActive from "../../helpers/formatLastActive";
import { LinearGradient } from "expo-linear-gradient";

export default function PublicProfile({ route }) {
  const userId = route.params?.userId;
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [userData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await newRequest.get(`/users/${userId}`);
        setUserData(userRes.data);
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to load user data",
        });
      }
    };

    fetchUser();
  }, [userId]);

  const handleAddFriend = async (id) => {
    try {
      await newRequest.post("/users/addFriend", { friendId: id });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Friend request sent",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send friend request",
      });
    }
  };

  const renderStatsCard = (title, value, variation) => {
    let colors;
    let icon;
    let shadowColor;

    if (variation === 1) {
      colors = ["#CCB6FF", "#9769FF"];
      shadowColor = "rgba(169, 131, 255, 0.50)";
      icon = "ios-star";
    }

    if (variation === 2) {
      colors = ["#FFD77F", "#FF9F43"];
      shadowColor = "rgba(255, 159, 67, 0.50)";
      icon = "ios-bonfire";
    }

    if (variation === 3) {
      colors = ["#1BEBB9", "#1A9B65"];
      shadowColor = "rgba(27, 235, 185, 0.50)";
      icon = "ios-trophy";
    }

    return (
      <LinearGradient
        colors={colors}
        style={{
          flex: 1,
          padding: 12,
          borderRadius: 12,
          shadowColor: shadowColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Ionicons name={icon} size={24} color="#fff" />
          <Text
            style={{
              color: "#fff",
              fontFamily: "poppins-regular",
              fontWeight: "400",
              textAlign: "center",
              fontSize: RFValue(13),
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontFamily: "poppins-bold",
              fontWeight: "600",
              fontSize: 24,
            }}
          >
            {value}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  if (!userData) {
    return null;
  }

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 20 }}
        >
          <Ionicons name="ios-arrow-back" size={24} color="#262625" />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 10 }}
      >
        <Animated.View
          style={[
            animatedStyle,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <View
            style={{
              backgroundColor: userData?.avatarBackground || "#ffffff",
              borderRadius: 75,
            }}
          >
            <Image
              cachePolicy="memory-disk"
              style={{ width: 140, height: 140, borderRadius: 75 }}
              source={{
                uri:
                  userData?.avatar ||
                  "https://thumbs.dreamstime.com/b/astronaut-cat-wearing-space-suit-elements-image-furnished-nasa-first-trip-to-space-mixed-media-167670791.jpg",
              }}
            />
          </View>
        </Animated.View>

        <View
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "#262625",
              fontSize: 24,
              fontFamily: "poppins-regular",
            }}
          >
            {userData?.username}
          </Text>
          {userData?.country && (
            <CountryFlag isoCode={userData?.country} size={20} />
          )}
        </View>
        <Text
          style={{
            color: "#5E6064",
            fontSize: 13,
            fontFamily: "poppins-regular",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {new Date().getTime() - new Date(userData?.lastActive).getTime() <
          432000000 ? (
            <>Last Active {formatLastActive(userData?.lastActive)}</>
          ) : null}
        </Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              color: "#FF4646",
              fontSize: 14,
              fontFamily: "poppins-regular",
            }}
          >
            Rookie | {userData?.experience} XP
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#EFF8FF",
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              borderRadius: 100,
              marginTop: 10,
              paddingHorizontal: 16,
              gap: 5,
            }}
          >
            <Ionicons name="ios-star" size={24} color="#FDD92C" />
            <Text
              style={{
                color: "#3F95F2",
                fontFamily: "poppins-bold",
                fontWeight: "600",
              }}
            >
              Average Rating: {userData?.averageRating}
            </Text>
          </View>
        </View>
        <Animated.View
          style={[
            animatedStyle,
            { flexDirection: "row", gap: 5, marginTop: 20 },
          ]}
        >
          {renderStatsCard("Games", userData?.totalGames || 0, 1)}
          {renderStatsCard(
            "Win Rate",
            `${Math.floor(userData?.winRate || 0)}%`,
            2
          )}
          {renderStatsCard("Avg Score", userData?.averageScore || 0, 3)}
        </Animated.View>

        <TouchableOpacity
          onPress={() => handleAddFriend(userId)}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: "#3F95F2",
            borderRadius: 16,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            Add Friend
          </Text>
          <LinearGradient
            colors={["rgba(255, 215, 0, 0)", "#FFD700", "rgba(255, 215, 0, 0)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              height: 3,
              width: "100%",
              marginTop: 4,
              borderRadius: 2,
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
