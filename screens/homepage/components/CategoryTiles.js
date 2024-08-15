import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const categoriesData = {
  "Recently Played": ["Game 1", "Game 2", "Game 3"], // Example data
  "Recently Added": ["Quiz 1", "Quiz 2", "Quiz 3"], // Example data
  Popular: ["Topic 1", "Topic 2", "Topic 3"], // Example data
  Trending: ["Trend 1", "Trend 2", "Trend 3"], // Example data
};

export default function CategoriesTiles() {
  const bottomSheetRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const handleOpenBottomSheet = (categoryName) => {
    setSelectedCategory(categoryName);
    setCategoryList(categoriesData[categoryName]);
    bottomSheetRef.current?.present(); // Open the bottom sheet
  };

  const renderContent = () => (
    <View style={{ padding: 20, backgroundColor: "white", height: "100%" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        {selectedCategory}
      </Text>
      <ScrollView style={{ flex: 1 }}>
        {categoryList.length > 0 ? (
          categoryList.map((item, index) => (
            <Text key={index} style={{ fontSize: 20, marginBottom: 10 }}>
              {item}
            </Text>
          ))
        ) : (
          <Text style={{ fontSize: 16 }}>No items available.</Text>
        )}
      </ScrollView>
    </View>
  );

  return (
    <BottomSheetModalProvider>
      <View style={{ padding: 10 }}>
        {Object.keys(categoriesData).map((categoryName, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: "#f8f8f8",
              padding: 20,
              marginBottom: 10,
              borderRadius: 10,
            }}
            onPress={() => handleOpenBottomSheet(categoryName)}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {categoryName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <BottomSheetModal ref={bottomSheetRef} index={0} snapPoints={["75%"]}>
        {renderContent()}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
