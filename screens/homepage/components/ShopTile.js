// components/ShopTile.js
import React from "react";
import { TouchableOpacity, ImageBackground, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ShopTile() {
  const handleShopClick = () => {
    Toast.show({
      type: "info",
      position: "bottom",
      text1: "Coming Soon",
      text2: "The shop feature will be available in a future update.",
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  return (
    <TouchableOpacity onPress={handleShopClick}>
      <View
        style={{
          borderRadius: 10,
          overflow: "hidden",
          marginVertical: -10,
          width: "100%",
          height: 200,
        }}
      >
        <ImageBackground
          source={require("../../../assets/shop-img.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
          imageStyle={{
            width: "100%",
            height: "100%",
            resizeMode: "stretch",
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
