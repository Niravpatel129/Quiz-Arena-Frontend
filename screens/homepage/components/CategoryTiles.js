import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const CategoryTiles = ({ categoryTiles, handleOpenBottomSheet }) => {
  const tileImages = {
    "Recently Played": require("../../../assets/recently-played.png"),
    "Recently Added": require("../../../assets/recently-added.png"),
    Trending: require("../../../assets/trending.png"),
    Popular: require("../../../assets/popular.png"),
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {categoryTiles.map((category) => (
        <TouchableOpacity
          key={category.name}
          style={{
            marginBottom: 15,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            width: "48%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            overflow: "hidden",
            height: 120,
          }}
          onPress={() => handleOpenBottomSheet(category)}
        >
          {/* Background Image */}
          <Image
            source={tileImages[category.name]}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            resizeMode="cover"
          />
          {/* Centered Text */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
              textShadowColor: "rgba(0, 0, 0, 0.5)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1,
            }}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryTiles;
