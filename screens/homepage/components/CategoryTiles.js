import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const CategoryTiles = ({ categoryTiles, handleOpenBottomSheet }) => {
  const tileImages = {
    "Recently Played": {
      uri: "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Frecently-added.png?alt=media&token=e932c480-2f14-4b18-bdaa-06c98dd09771",
    },
    "Recently Added": {
      uri: "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Frecently-played.png?alt=media&token=3b023abe-876d-4dd8-9643-cc57ecd4914d",
    },
    Trending: {
      uri: "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Ftrending.png?alt=media&token=4b551d11-fd3d-45ba-8928-517055000a4e",
    },
    Popular: {
      uri: "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fpopular.png?alt=media&token=d04973e1-aae3-4266-84e4-34e757d517b4",
    },
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
            marginBottom: 13,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            width: "48%",
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
