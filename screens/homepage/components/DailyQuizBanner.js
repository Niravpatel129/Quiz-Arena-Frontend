import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

export default function DailyQuizBanner({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={require("../../../assets/daily-quiz-background.png")}
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          borderRadius: 10,
          overflow: "hidden",
          height: 100,
        }}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            textShadowColor: "#000",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          Join Daily Quiz
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
