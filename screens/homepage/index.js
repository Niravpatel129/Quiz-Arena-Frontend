import React, { useEffect, useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { newRequest } from "../../api/newRequest";
import useCategories from "../../hooks/useCategories";
import useStreak from "../../hooks/useStreak";
import { keys } from "../../keys";
// import CategoriesList from './components/CategoriesList'; // Commented out as we are not using it now
// import RoyaleHeader from './components/RoyaleHeader'; // Commented out as we are not using it now
// import UserProfile from './components/UserProfile'; // Commented out as we are not using it now

export default function Homepage() {
  const { categories, userData } = useCategories();
  const [config, setConfig] = useState({ triviaTuesdayEnabled: false });
  const opacity = useSharedValue(0);
  const [updateStreak] = useStreak();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (categories) {
      opacity.value = withSpring(1);
    }
  }, [categories]);

  useEffect(() => {
    updateStreak();

    const fetchConfig = async () => {
      const res = await newRequest.get(`/homepage/config/${keys.version}`);

      setConfig(res.data);
      console.log("🚀  res:", res.data);

      if (res.data?.updatedRequired) {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Update Available",
          text2:
            "A new version of the app is available, we recommend updating it now.",
          visibilityTime: 3000,
          autoHide: false,
          onPress: () => {
            const link =
              Platform.OS === "ios"
                ? "https://apps.apple.com/ca/app/quiz-arena-trivia-questions/id6474947179"
                : "https://play.google.com/store/apps/details?id=com.niravpatelp129.QuizArenaFrontendScaffold";

            Linking.openURL(link);
          },
        });
      }
    };

    fetchConfig();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View
        style={[
          {
            padding: 10,
            backgroundColor: "#fff",
            height: "100%",
            gap: 20,
            marginBottom: 100,
          },
          animatedStyle,
        ]}
      >
        {/* Example Category Tiles */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={tileStyle}>
            <Text style={tileTextStyle}>Recently Played</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tileStyle}>
            <Text style={tileTextStyle}>Recently Added</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tileStyle}>
            <Text style={tileTextStyle}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tileStyle}>
            <Text style={tileTextStyle}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tileStyle}>
            <Text style={tileTextStyle}>Explore More Categories</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const tileStyle = {
  backgroundColor: "#f8f8f8",
  padding: 20,
  marginBottom: 10,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  flexBasis: "48%",
  height: 120,
};

const tileTextStyle = {
  fontSize: 18,
  fontWeight: "bold",
};
