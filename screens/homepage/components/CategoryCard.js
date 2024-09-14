import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const imageMap = {};

function CategoryCard({
  item,
  parentCategory,
  isParentCategory,
  onCategoryPress,
}) {
  const [imageSource, setImageSource] = useState(
    imageMap[item.name?.toLowerCase()] || {
      uri: item.logo || "default_image_url",
    }
  );

  const handleImageError = () => {
    setImageSource({
      uri: item.logo || "default_image_url",
    });
  };

  const handlePress = () => {
    if (onCategoryPress) {
      onCategoryPress(
        item,
        isParentCategory,
        parentCategory,
        item.subCategories
      );
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable
        style={{ borderRadius: 16, overflow: "hidden" }}
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
