import React, { useEffect, useState, useRef } from "react";
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
} from "@gorhom/bottom-sheet";
import { newRequest } from "../../api/newRequest";
import useCategories from "../../hooks/useCategories";
import useStreak from "../../hooks/useStreak";
import { keys } from "../../keys";
import CategoryCard from "./components/CategoryCard";

export default function Homepage() {
  const { categories, userData } = useCategories();
  const [config, setConfig] = useState({ triviaTuesdayEnabled: false });
  const opacity = useSharedValue(0);
  const [updateStreak] = useStreak();

  const bottomSheetRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryItems, setCategoryItems] = useState([]);

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
    setSelectedCategory(category);
    const categoryData = categories.find(
      (cat) => cat.parentCategory === category
    );
    setCategoryItems(categoryData ? categoryData.subCategories : []);
    bottomSheetRef.current?.present();
  };

  const renderCategoryItems = () => (
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

  const categoryTiles = [
    "Popular",
    "Trending",
    "Recently Added",
    "Recently Played",
  ];

  return (
    <BottomSheetModalProvider>
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
          {config.triviaTuesdayEnabled && <RoyaleHeader />}

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {categoryTiles.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: "#f8f8f8",
                  padding: 20,
                  marginBottom: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexBasis: "48%",
                  height: 120,
                }}
                onPress={() => handleOpenBottomSheet(category)}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={["75%"]}
        style={{
          paddingHorizontal: 10,
        }}
      >
        {renderCategoryItems()}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
