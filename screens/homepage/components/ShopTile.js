// components/ShopTile.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
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
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 15,
        }}
      >
        <FontAwesome name="shopping-cart" size={50} color="#333" />
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
          Shop
        </Text>
      </View>
    </TouchableOpacity>
  );
}
