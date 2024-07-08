import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CustomButton from "./CustomButton"; // Ensure your file name matches

export default function GameOver({ score, handleStartGame, results }) {
  console.log("🚀  results:", results);
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(false);

  // Animation control: opacity value
  const opacity = useSharedValue(0);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // Trigger the animation when `results` changes and is not null
  useEffect(() => {
    console.log("useEffect triggered with results:", results);
    // if (results && results.feeder) {
    console.log("Results and feeder are present");
    opacity.value = withTiming(1, {
      duration: 500, // Animation duration in milliseconds
      easing: Easing.out(Easing.quad), // Easing function
    });
    // }
  }, [results]); // Dependency array, effect runs when `results` changes

  if (!results) {
    console.log("No results found");
    return (
      <View>
        <Text> Hello world</Text>
      </View>
    );
  }

  console.log("Rendering GameOver component with results:", results);

  return (
    <Animated.View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          flex: 1, // Ensure it takes full space if needed
        },
        animatedStyle, // Apply the animated style here for the fade-in effect
      ]}
    >
      <Text
        style={{
          fontSize: 24,
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        Not too shabby!
      </Text>
      <Image
        source={require("../../../assets/mascot.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontFamily: "poppins-regular",
          letterSpacing: 2,
          color: "black",
          textAlign: "center",
        }}
      >
        Your Score: {score}
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontFamily: "poppins-regular",
          letterSpacing: 2,
          color: "black",
          textAlign: "center",
        }}
      >
        Your Personal Best: {results.personalBest}
      </Text>

      {results.percentileRank && (
        <Text>
          That attempt was better than {results.percentileRank}% of the players!
        </Text>
      )}
      {results.personalBestPercentileRank && (
        <Text>
          Your personal best is in the Top {results.personalBestPercentileRank}%
          percentile.
        </Text>
      )}

      <View
        style={{
          gap: 10,
          marginTop: 20,
        }}
      >
        <CustomButton
          title="Play Again"
          variant="primary"
          onPress={() => {
            console.log("Restart Game button pressed");
            handleStartGame();
          }}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "poppins-semiBold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Restart Game
          </Text>
        </CustomButton>
        <TouchableOpacity
          onPress={() => {
            console.log("Go back home button pressed");
            navigation.navigate("Home");
          }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "poppins-semiBold",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Go back home
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
