import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { newRequest } from '../../api/newRequest';
import useStreak from '../../hooks/useStreak';
import CategoriesList from './components/CategoriesList';
import UserProfile from './components/UserProfile';

export default function Homepage() {
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({});
  const opacity = useSharedValue(0);
  const [updateStreak] = useStreak();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      updateStreak();
      const res = await newRequest('/homepage/home');
      setCategories(res.data.categories);
      setUserData(res.data.user);
    };
    opacity.value = withSpring(1);

    fetchData();
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
          },
          animatedStyle,
        ]}
      >
        <UserProfile userData={userData} />
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
