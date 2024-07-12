import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const TimeProgressBar = ({ currentTime, maxTime }) => {
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    const percentage = (currentTime / maxTime) * 100;
    const screenWidth = Dimensions.get("window").width;
    const calculatedWidth = (screenWidth * percentage) / 100;
    // Animate progressWidth
    progressWidth.value = withTiming(calculatedWidth, {
      duration: 500, // Animation duration in milliseconds
      easing: Easing.linear, // Animation easing function
    });
  }, [currentTime, maxTime, progressWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, animatedStyle]}>
        <LinearGradient
          colors={["#0096FF", "#1434A4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    topPadding: -5,
  },
  progressBar: {
    height: "100%",
    borderRadius: 10,
  },
});

export default TimeProgressBar;
