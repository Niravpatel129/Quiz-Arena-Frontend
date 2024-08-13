import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AvatarBottomSheet from "./AvatarBottomSheet"; // Reusing your existing bottom sheet structure

const categoriesData = {
  "Recently Played": [], // Add actual data
  "Recently Added": [], // Add actual data
  "Popular Categories": [], // Add actual data
  "Trending Categories": [], // Add actual data
};

export default function CategoriesTiles() {
  const bottomSheetRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const handleOpenBottomSheet = (categoryName) => {
    setSelectedCategory(categoryName);
    setCategoryList(categoriesData[categoryName]); // Update with actual category data
    bottomSheetRef.current?.present();
  };

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

      <AvatarBottomSheet
        ref={bottomSheetRef}
        snapPoints={["50%"]}
        onChange={(index) => {
          if (index === -1) {
            console.log("Bottom sheet dismissed");
          }
        }}
        renderBackdrop={() => (
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              flex: 1,
            }}
          />
        )}
        selectedAvatar={null} // Pass necessary props if needed
        setSelectedAvatar={() => {}} // Pass necessary props if needed
        onSaveChanges={() => {}} // Pass necessary props if needed
      />
    </BottomSheetModalProvider>
  );
}
