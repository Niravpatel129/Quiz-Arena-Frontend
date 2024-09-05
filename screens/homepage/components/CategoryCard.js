import React, { useState, useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { ImageBackground } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { SoundContext } from "../../../context/sound/SoundContext";

const imageMap = {};

function CategoryCard({ item, parentCategory, onPress }) {
  // const { playSound } = useContext(SoundContext);
  const [imageSource, setImageSource] = useState(
    imageMap[item.name?.toLowerCase()] || {
      uri:
        item.logo ||
        "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    }
  );

  const handleImageError = () => {
    if (!imageMap[item.name]) {
      setImageSource({
        uri:
          item.logo ||
          "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      });
    }
  };

  const handlePress = () => {
    // if (playSound) {
    //   playSound("click");
    // }
    if (onPress) {
      onPress(item, parentCategory);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        style={{
          borderRadius: 16,
          overflow: "hidden",
        }}
        onPress={handlePress}
      >
        <ImageBackground
          source={imageSource}
          cachePolicy="memory-disk"
          onError={handleImageError}
          style={{
            width: 120,
            height: 160,
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: 2,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              width: "100%",
              height: "100%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Ionicons name="play-circle" size={40} color="#fff" />
          </View>
        </ImageBackground>
      </Pressable>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: "#1d284b",
          textTransform: "capitalize",
          maxWidth: 90,
          textAlign: "center",
          flexWrap: "wrap",
          flexShrink: 1,
          marginTop: 4,
          height: 50,
        }}
      >
        {item.name}
      </Text>
    </View>
  );
}

export default CategoryCard;
