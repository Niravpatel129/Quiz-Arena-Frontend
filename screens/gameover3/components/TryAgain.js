import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";

export default function TryAgain({ didWin }) {
  const opacityAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.5);
  const rotateAnim = useSharedValue(0);
  const idleAnim = useSharedValue(1);
  const particlesOpacityAnim = useSharedValue(0);
  const particlesScaleAnim = useSharedValue(1);

  useEffect(() => {
    // Load-in animation
    opacityAnim.value = withTiming(1, { duration: 500 });
    scaleAnim.value = withSequence(
      withSpring(1.2, { friction: 3 }),
      withSpring(1, { friction: 4 })
    );
    rotateAnim.value = withSpring(1, { friction: 5 });

    // Idle animation
    idleAnim.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );

    // Particles animation
    particlesOpacityAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      true
    );
    particlesScaleAnim.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnim.value,
      transform: [
        { scale: scaleAnim.value },
        { rotate: `${rotateAnim.value * 360}deg` },
        { scale: idleAnim.value },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnim.value,
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const animatedParticlesStyle = useAnimatedStyle(() => {
    return {
      opacity: particlesOpacityAnim.value,
      transform: [{ scale: particlesScaleAnim.value }],
    };
  });

  const winImage =
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxoltol-you-won.png?alt=media&token=c79e7629-3625-4541-bd1f-2472ef258be4";
  const loseImage =
    "https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/axolotl-profile-avatars%2Faxolotl-you-lost.png?alt=media&token=6777d007-9afa-4046-8aba-013cdc673910";

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <View>
        <Animated.Image
          source={{ uri: didWin ? winImage : loseImage }}
          style={[
            {
              width: 100,
              height: 100,
            },
            animatedImageStyle,
          ]}
        />
        {didWin && (
          <Animated.Image
            source={require("../../../assets/pink-particles.png")}
            style={[
              {
                position: "absolute",
                width: 120,
                height: 120,
                top: -10,
                left: -10,
              },
              animatedParticlesStyle,
            ]}
          />
        )}
        {!didWin && (
          <Animated.Image
            source={require("../../../assets/tear-particles2.png")}
            style={[
              {
                position: "absolute",
                width: 80,
                height: 80,
                top: 40,
                left: 0,
              },
              animatedParticlesStyle,
            ]}
          />
        )}
      </View>
      <Animated.Text
        style={[
          {
            fontFamily: "poppins-semiBold",
            fontSize: 26,
            color: "#181A17",
          },
          animatedTextStyle,
        ]}
      >
        {didWin ? "Yay! You won! 🎉" : "Oops! You lost 🚨"}
      </Animated.Text>
    </View>
  );
}
