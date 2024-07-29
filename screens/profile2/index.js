import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import CombinedModal from "./components/CombinedModal";

export default function Profile2({ userId }) {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState(userData?.username);
  const [selectedAvatar, setSelectedAvatar] = useState(userData?.avatar);

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
      const userRes = await newRequest.get(`/users/${userId}`);
      setUserData(userRes.data);
    };

    fetchUser();
  }, []);

  const handleSave = (avatar, username) => {
    setSelectedAvatar(avatar);
    setNewUsername(username);
    setModalVisible(false);
    // Update user avatar and username on the server
    newRequest
      .put(`/users/avatar`, { avatar, username })
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully",
        });
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An error occurred while updating your profile",
        });
        console.log(e);
      });
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
              fontWeight: 400,
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
              fontWeight: 600,
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
    <View style={styles.container}>
      <CombinedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        defaultUsername={newUsername}
        defaultAvatar={selectedAvatar}
      />

      <SafeAreaView style={styles.safeArea}>
        {userId && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="ios-arrow-back" size={24} color="#262625" />
          </TouchableOpacity>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <TouchableOpacity
            onPress={() => {
              if (userId) return;
              setModalVisible(true);
            }}
          >
            <Animated.View style={[animatedStyle, styles.avatarContainer]}>
              <Image
                cachePolicy="memory-disk"
                style={styles.avatar}
                source={{
                  uri:
                    selectedAvatar ||
                    userData?.avatar ||
                    "https://thumbs.dreamstime.com/b/astronaut-cat-wearing-space-suit-elements-image-furnished-nasa-first-trip-to-space-mixed-media-167670791.jpg",
                }}
              ></Image>
            </Animated.View>
          </TouchableOpacity>

          <View style={styles.usernameContainer}>
            <TouchableOpacity
              onPress={() => {
                if (userId) return;
                setModalVisible(true);
              }}
            >
              <Text style={styles.username}>
                {newUsername || userData?.username}
              </Text>
            </TouchableOpacity>
            {userData?.country && (
              <CountryFlag isoCode={userData?.country} size={20} />
            )}
          </View>

          <Text style={styles.lastActiveText}>
            {new Date().getTime() - new Date(userData?.lastActive).getTime() <
            432000000 ? (
              <>Last Active {formatLastActive(userData?.lastActive)}</>
            ) : null}
          </Text>

          <View style={styles.experienceContainer}>
            <Text style={styles.experienceText}>
              Rookie | {userData?.experience} XP
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Ionicons name="ios-star" size={24} color="#FDD92C" />
              <Text style={styles.ratingText}>
                Average Rating: {userData?.averageRating}
              </Text>
            </View>
          </View>

          <Animated.View style={[animatedStyle, styles.statsContainer]}>
            {renderStatsCard("Games", userData?.totalGames || 0, 1)}
            {renderStatsCard(
              "Win Rate",
              `${Math.floor(userData?.winRate || null)}%`,
              2
            )}
            {renderStatsCard("Avg Score", 85, 3)}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    padding: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 150,
  },
  usernameContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },
  username: {
    color: "#262625",
    fontSize: 24,
    fontFamily: "poppins-regular",
  },
  lastActiveText: {
    color: "#5E6064",
    fontSize: 13,
    fontFamily: "poppins-regular",
    textAlign: "center",
    marginBottom: 10,
  },
  experienceContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  experienceText: {
    color: "#FF4646",
    fontSize: 14,
    fontFamily: "poppins-regular",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    backgroundColor: "#EFF8FF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 100,
    marginTop: 10,
    paddingHorizontal: 16,
    gap: 5,
  },
  ratingText: {
    color: "#3F95F2",
    fontFamily: "poppins-bold",
    fontWeight: 600,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
  },
});
