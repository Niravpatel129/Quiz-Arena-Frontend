import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function ExploreMoreCategories() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SecondaryHomepage");
      }}
      style={{
        marginVertical: -15,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        borderColor: "#e0e0e0",
        borderWidth: 1,
      }}
    >
      <LinearGradient
        colors={["#f3f3f3", "#d9d9d9"]}
        style={{
          padding: 20,
          borderRadius: 16,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#333",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Explore More Categories
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
