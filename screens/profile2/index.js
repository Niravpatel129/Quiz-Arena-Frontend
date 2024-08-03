import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
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
import AvatarBottomSheet from "./components/CombinedModal/AvatarBottomSheet";
import { LinearGradient } from "expo-linear-gradient";
import UsernameInput from "./components/CombinedModal/UsernameInput";

export default function Profile2({ userId }) {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const [defaultUsername, setDefaultUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [avatarBackground, setAvatarBackground] = useState("#ffffff");
  const [isUsernameModalVisible, setIsUsernameModalVisible] = useState(false);

  // Bottom Sheet
  const bottomSheetModalRef = useRef(null);
  const initialSnapPoints = useMemo(() => ["50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

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
      setNewUsername(userRes.data.username);
      setDefaultUsername(userRes.data.username);
    };

    fetchUser();
  }, []);

  const handleSave = (avatar, background) => {
    setSelectedAvatar(avatar);
    setAvatarBackground(background);
    newRequest
      .put(`/users/avatar`, { avatar, background })
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

  const handleUsernameChange = () => {
    newRequest
      .put(`/users`, { username: newUsername })
      .then(() => {
        setUserData({ ...userData, username: newUsername });
        setIsUsernameModalVisible(false);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Username updated successfully",
        });
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Sorry that username is already taken!",
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
    <View style={{ height: "100%", backgroundColor: "white" }}>
      {userId && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 20 }}
        >
          <Ionicons name="ios-arrow-back" size={24} color="#262625" />
        </TouchableOpacity>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 10 }}
      >
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Animated.View
            style={[
              animatedStyle,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <View
              style={{ backgroundColor: avatarBackground, borderRadius: 75 }}
            >
              <Image
                cachePolicy="memory-disk"
                style={{ width: 140, height: 140, borderRadius: 75 }}
                source={{
                  uri:
                    selectedAvatar ||
                    userData?.avatar ||
                    "https://thumbs.dreamstime.com/b/astronaut-cat-wearing-space-suit-elements-image-furnished-nasa-first-trip-to-space-mixed-media-167670791.jpg",
                }}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>

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
          <TouchableOpacity onPress={() => setIsUsernameModalVisible(true)}>
            <Text
              style={{
                color: "#262625",
                fontSize: 24,
                fontFamily: "poppins-regular",
              }}
            >
              {newUsername || userData?.username}
            </Text>
          </TouchableOpacity>
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
          {/* Only show this if it's last 5 days */}
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
                fontWeight: 600,
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
          {renderStatsCard("Avg Score", 85, 3)}
        </Animated.View>
      </ScrollView>

      <AvatarBottomSheet
        ref={bottomSheetModalRef}
        snapPoints={initialSnapPoints}
        onChange={handleSheetChanges}
        renderBackdrop={renderBackdrop}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
        onSaveChanges={handleSave}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isUsernameModalVisible}
        onRequestClose={() => setIsUsernameModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <UsernameInput
              defaultUsername={defaultUsername}
              newUsername={newUsername}
              setNewUsername={setNewUsername}
              usernameInputVisible={true}
              error=""
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setIsUsernameModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSave]}
                onPress={handleUsernameChange}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottomSheet: {
    zIndex: 1000,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: "#2196F3",
  },
  buttonSave: {
    backgroundColor: "#4CAF50",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
