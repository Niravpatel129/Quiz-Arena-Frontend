import React, { useEffect, useState, useRef, useCallback } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { newRequest } from "../../api/newRequest";
import useCategories from "../../hooks/useCategories";
import useStreak from "../../hooks/useStreak";
import { keys } from "../../keys";
import CategoryCard from "./components/CategoryCard";
import ExploreMoreCategories from "./components/ExploreMoreCategories";
import UserProfile from "./components/UserProfile";
import DailyQuizBanner from "./components/DailyQuizBanner";
import DailyQuizLeaderboard from "./components/DailyQuiz";
import CategoryTiles from "./components/CategoryTiles";
import ShopTile from "./components/ShopTile";

export default function Homepage() {
  const navigation = useNavigation();
  const { landingCategories, userData } = useCategories();
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
    if (landingCategories) {
      opacity.value = withSpring(1);
    }
  }, [landingCategories]);

  useEffect(() => {
    updateStreak();
    fetchConfig();
    fetchLeaderboardData();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await newRequest.get(`/homepage/config/${keys.version}`);
      setConfig(res.data);
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      const res = await newRequest.get("/leaderboard/dailyquiz");
      setLeaderboard(res.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  const handleOpenBottomSheet = (category) => {
    if (typeof category === "string" && category === "Daily Quiz") {
      setSelectedCategory("Daily Quiz");
      setIsDailyQuiz(true);
    } else {
      setSelectedCategory(category.name);
      setIsDailyQuiz(false);
      const categoryData = landingCategories.find(
        (cat) => cat.parentCategory === category.name
      );
      setCategoryItems(categoryData ? categoryData.subCategories : []);
    }
    bottomSheetRef.current?.present();
  };

  const handleCategoryPress = (item) => {
    const nameId = item.name.split(" ").join("-");
    bottomSheetRef.current?.dismiss();
    navigation.navigate("CategoryScreen", {
      categoryId: nameId,
      categoryName: item.name,
      parentCategory: selectedCategory,
      categoryImage: item.logo || "default_image_url",
    });
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
              <CategoryCard
                item={item}
                parentCategory={selectedCategory}
                isHomepageTile={true}
                onCategoryPress={handleCategoryPress}
              />
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
    <>
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
          <CategoryTiles
            categoryTiles={landingCategories.map((cat) => ({
              name: cat.parentCategory,
              isHomepageTile: true,
            }))}
            handleOpenBottomSheet={handleOpenBottomSheet}
          />
          <ExploreMoreCategories />
          <ShopTile />
        </Animated.View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={isDailyQuiz ? ["45%"] : ["52%", "75%"]}
        style={{
          paddingHorizontal: 10,
        }}
        backdropComponent={renderBackdrop}
      >
        {renderCategoryItems()}
      </BottomSheetModal>
    </>
  );
}
