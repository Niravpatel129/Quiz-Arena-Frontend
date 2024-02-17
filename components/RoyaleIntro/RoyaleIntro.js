import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import slides from './slides';

const { width } = Dimensions.get('window');

export default function RoyaleIntro({ setShowIntroduction }) {
  const scrollX = useSharedValue(0);

  const handleSkip = () => {
    setShowIntroduction(false);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          handleSkip();
        }}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View style={styles.slide} key={index}>
            <Image source={{ uri: slide.image }} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.dotContainer}>
        {slides.map((_, index) => {
          const dotStyle = useAnimatedStyle(() => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const widthInterpolation = interpolate(
              scrollX.value,
              inputRange,
              [10, 20, 10],
              Extrapolate.CLAMP,
            );

            return {
              width: widthInterpolation,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'black',
              marginHorizontal: 2,
            };
          });

          return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 10,
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  dot: {},
  skipButton: {
    zIndex: 1,
    position: 'absolute',
    top: 60,
    right: 20,
  },
  skipText: {
    fontSize: 16,
    color: 'black',
  },
});
