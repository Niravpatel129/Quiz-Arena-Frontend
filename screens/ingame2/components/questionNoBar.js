import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

export default function QuestionNoBar({ roundNumber }) {
  // Animated value for the fill-up animation
  const fillAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the fill-up animation when roundNumber changes
    Animated.timing(fillAnimation, {
      toValue: 1, // Animate to the full width
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: false, // Set to false because we're animating layout properties
    }).start();
  }, [roundNumber]);

  return (
    <View
      style={{
        marginTop: 15,
        marginHorizontal: 5,
      }}
    >
      <Text
        style={{
          color: '#5E6064',
          fontFamily: 'poppins-regular',
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        Question No. {roundNumber - 1 || 1}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {Array.from({ length: 7 }).map((_, index) => {
          const filled = index < roundNumber - 1;
          let fillColor = '#E8E8E8';

          if (filled) {
            fillColor = '#3F95F2';
          }

          if (index === roundNumber - 2) {
            // Use Animated.View for the current question bar
            return (
              <Animated.View
                key={index}
                style={{
                  height: 5,
                  backgroundColor: '#EC80B4',
                  borderRadius: 10,
                  flex: fillAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1], // Interpolate width from 0 to 1 (full width)
                  }),
                }}
              ></Animated.View>
            );
          }

          // For all other bars
          return (
            <View
              key={index}
              style={{
                height: 5,
                backgroundColor: fillColor,
                borderRadius: 10,
                flex: 1,
              }}
            ></View>
          );
        })}
      </View>
    </View>
  );
}
