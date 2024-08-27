import React, { useEffect, useState, useRef, useCallback } from "react";
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
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { newRequest } from "../../api/newRequest";
import useCategories from "../../hooks/useCategories";
import useStreak from "../../hooks/useStreak";
import { keys } from "../../keys";
import CategoryCard from "./components/CategoryCard";
import ExploreMoreCategories from "./components/ExploreMoreCategories";
import UserProfile from "./components/UserProfile";
import DailyQuizBanner from "./components/DailyQuizBanner";
import DailyQuizLeaderboard from "./components/DailyQuizLeaderboard";
import CategoryTiles from "./components/CategoryTiles";
import ShopTile from "./components/ShopTile";

export default function Homepage() {
  const { categories, userData } = useCategories();
  const [config, setConfig] = useState({ triviaTuesdayEnabled: false });
  const opacity = useSharedValue(0);
  const [updateStreak] = useStreak();
  const [leaderboard, setLeaderboard] = useState([]);
  const bottomSheetRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryItems, setCategoryItems] = useState([]);
  const [isDailyQuiz, setIsDailyQuiz] = useState(false);

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
    fetchConfig();
    fetchLeaderboardData();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await newRequest.get(`/homepage/config/${keys.version}`);
      setConfig(res.data);
      handleUpdateNotification(res.data);
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      const res = await newRequest.get("/leaderboard/dailyquiz"); // endpoint for daily quiz leaderboard
      setLeaderboard(res.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  const handleUpdateNotification = (configData) => {
    if (configData?.updatedRequired) {
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

  const handleOpenBottomSheet = (category) => {
    if (typeof category === "string" && category === "Daily Quiz") {
      setSelectedCategory("Daily Quiz");
      setIsDailyQuiz(true);
    } else {
      setSelectedCategory(category.name);
      setIsDailyQuiz(false);
      const categoryData = categories.find(
        (cat) => cat.parentCategory === category.name
      );
      setCategoryItems(categoryData ? categoryData.subCategories : []);
    }
    bottomSheetRef.current?.present();
  };

  const renderCategoryItems = () => {
    if (isDailyQuiz) {
      return <DailyQuizLeaderboard leaderboard={leaderboard} />;
    }
    return (
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          {selectedCategory}
        </Text>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          {categoryItems.map((item, index) => (
            <View
              key={index}
              style={{
                width: "30%",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CategoryCard item={item} parentCategory={selectedCategory} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            {
              padding: 12,
              backgroundColor: "#fff",
              height: "100%",
              gap: 10,
            },
            animatedStyle,
          ]}
        >
          <UserProfile userData={userData} />
          <DailyQuizBanner
            onPress={() => handleOpenBottomSheet("Daily Quiz")}
          />
          {/* {config.triviaTuesdayEnabled && <RoyaleHeader />} */}
          <CategoryTiles
            categoryTiles={[
              { name: "Recently Played" },
              { name: "Recently Added" },
              { name: "Trending" },
              { name: "Popular" },
            ]}
            handleOpenBottomSheet={handleOpenBottomSheet}
          />
          <ExploreMoreCategories />
          <ShopTile />
        </Animated.View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={isDailyQuiz ? ["65%"] : ["40%", "66%"]}
        style={{
          paddingHorizontal: 10,
        }}
        backdropComponent={renderBackdrop}
      >
        {renderCategoryItems()}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
