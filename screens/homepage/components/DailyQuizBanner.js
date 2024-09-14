import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DailyQuizBanner({ onPress }) {
  return (
    <LinearGradient
      // Slightly lighter gradient colors
      colors={["#8e95cf", "#c295b8"]}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
            textShadowColor: "#000", // Subtle shadow for pop effect
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 5,
          }}
        >
          Daily Quiz
        </Text>
        <Text
          style={{
            paddingRight: 10,
            fontSize: 14,
            color: "#ddd",
            marginTop: 5,
            textShadowColor: "#000",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 4,
          }}
        >
          Join the Ultimate Quiz Adventure and Test Your Intellect
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#333",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 8,
        }}
        onPress={onPress}
      >
        <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
          Join a quiz
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
