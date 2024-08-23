import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const CategoryTiles = ({ categoryTiles, handleOpenBottomSheet }) => {
  const tileImages = [
    require("../../../assets/recently-played.png"),
    require("../../../assets/trending.png"),
    require("../../../assets/recently-added.png"),
    require("../../../assets/popular.png"),
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginHorizontal: 10,
      }}
    >
      {categoryTiles.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={{
            marginBottom: 15,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            width: "47%",
            aspectRatio: 16 / 9,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            overflow: "hidden",
            height: 250,
          }}
          onPress={() => handleOpenBottomSheet(category)}
        >
          {/* Background Image */}
          <Image
            source={tileImages[index]}
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
