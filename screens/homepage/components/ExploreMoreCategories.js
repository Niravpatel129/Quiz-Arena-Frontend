import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ExploreMoreCategories() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SecondaryHomepage");
      }}
      style={{
        padding: 20,
        backgroundColor: "#3F95F2",
        borderRadius: 16,
        alignItems: "center",
        marginVertical: -15,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
        Explore More Categories
      </Text>
    </TouchableOpacity>
  );
}
