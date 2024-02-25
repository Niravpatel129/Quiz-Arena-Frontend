import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { newRequest } from '../../api/newRequest';
import useCategories from '../../hooks/useCategories';
import useStreak from '../../hooks/useStreak';
import { keys } from '../../keys';
import CategoriesList from './components/CategoriesList';
import RoyaleHeader from './components/RoyaleHeader';
import UserProfile from './components/UserProfile';

export default function Homepage() {
  const { categories, userData } = useCategories();
  const [config, setConfig] = useState({ triviaTuesdayEnabled: false });
  const opacity = useSharedValue(0);
  const [updateStreak] = useStreak();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (categories) {
      opacity.value = withSpring(1);
    }
  }, [categories]);

  useEffect(() => {
    updateStreak();

    const fetchConfig = async () => {
      const res = await newRequest.get(`/homepage/config/${keys.version}`);

      setConfig(res.data);
    };

    fetchConfig();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View
        style={[
          {
            padding: 10,
            backgroundColor: '#fff',
            height: '100%',
            gap: 20,
            marginBottom: 100,
          },
          animatedStyle,
        ]}
      >
        <UserProfile userData={userData} />
        {config.triviaTuesdayEnabled && <RoyaleHeader />}
        {categories.map((category, index) => {
          return (
            <CategoriesList
              key={index}
              parentCategory={category.parentCategory}
              subCategories={category.subCategories}
            />
          );
        })}
      </Animated.View>
    </ScrollView>
  );
}
