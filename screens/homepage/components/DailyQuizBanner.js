import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

export default function DailyQuizBanner({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fdaily-quiz-background.png?alt=media&token=64085815-b66b-4b2d-b747-c62bf2d7d88a",
        }}
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
