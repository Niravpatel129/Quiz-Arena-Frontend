import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DailyQuizBanner({ onPress }) {
  return (
    <LinearGradient
      colors={["#c8d9f3", "#f2c4dc"]}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          Daily Quiz
        </Text>
        <Text style={{ fontSize: 14, color: "#fff", marginTop: 5 }}>
          Join the Ultimate Quiz Adventure and Test Your Intellect
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
        }}
        onPress={onPress}
      >
        <Text style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}>
          Join a quiz
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
