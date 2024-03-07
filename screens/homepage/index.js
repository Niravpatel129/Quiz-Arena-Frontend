import React, { useEffect, useState } from 'react';
import { Linking, Platform, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
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
      console.log('🚀  res:', res.data);

      if (true || res.data?.updatedRequired) {
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: 'Update Available',
          text2: 'A new version of the app is available, we recommend updating it now.',
          visibilityTime: 3000,
          autoHide: false,
          onPress: () => {
            const link =
              Platform.OS === 'ios'
                ? 'https://apps.apple.com/ca/app/quiz-arena-trivia-questions/id6474947179'
                : 'https://play.google.com/store/apps/details?id=com.niravpatelp129.QuizArenaFrontendScaffold';

            Linking.openURL(link);
          },
        });
      }
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
