import React, { useEffect, useState } from "react";
import { ScrollView, Platform, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { newRequest } from "../../../api/newRequest";
import useCategories from "../../../hooks/useCategories";
import useStreak from "../../../hooks/useStreak";
import { keys } from "../../../keys";
import CategoriesList from "./CategoriesList";
// import RoyaleHeader from "./RoyaleHeader"; // Uncomment if needed

export default function SecondaryHomepage() {
  const navigation = useNavigation();
  const { exploreCategories, userData } = useCategories();
  const [config, setConfig] = useState({ triviaTuesdayEnabled: false });
  const opacity = useSharedValue(0);
  const [updateStreak] = useStreak();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (exploreCategories) {
      opacity.value = withSpring(1);
    }
  }, [exploreCategories]);

  useEffect(() => {
    updateStreak();

    const fetchConfig = async () => {
      const res = await newRequest.get(`/homepage/config/${keys.version}`);

      setConfig(res.data);

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

  const SPECIAL_CATEGORIES = ["Recently Added", "Popular", "Trending"];

  const handleCategoryPress = (
    item,
    isParentCategory,
    parentCategory,
    subCategories
  ) => {
    const nameId = item.name.split(" ").join("-");

    if (isParentCategory) {
      if (SPECIAL_CATEGORIES.includes(item.name)) {
        // Handle special categories
        console.log("Open special category:", item.name);
        navigation.navigate("SpecialCategoryScreen", {
          categoryName: item.name,
        });
      } else {
        // Navigate to subcategories screen for regular parent categories
        navigation.navigate("SubcategoriesScreen", {
          categoryName: item.name,
          subcategories: item.subCategories,
        });
      }
    } else {
      // It's a subcategory
      navigation.navigate("CategoryScreen", {
        categoryId: nameId,
        categoryName: item.name,
        parentCategory: parentCategory,
        categoryImage: item.logo || "default_image_url",
      });
    }
  };

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
        {/* {config.triviaTuesdayEnabled && <RoyaleHeader />} */}
        {exploreCategories.map((category, index) => (
          <CategoriesList
            key={index}
            parentCategory={category.name || category.parentCategory}
            subCategories={category.subCategories}
            onCategoryPress={handleCategoryPress}
          />
        ))}
      </Animated.View>
    </ScrollView>
  );
}
