import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Animated, Easing, SafeAreaView } from 'react-native';
import { newRequest } from '../../api/newRequest';
import socketService from '../../services/socketService';
import ImageDescription from './components/ImageDescription';
import LogoTitle from './components/LogoTitle';
import SocialEmailLogin from './components/SocialEmailLogin';
import TermsPrivacyPolicy from './components/TermsPrivacyPolicy';

export default function Login() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [buttonAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    const loadStoredToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        try {
          await newRequest.get('/auth/validate-token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          socketService.connect();

          navigation.reset({
            index: 0,
            routes: [{ name: 'Categories' }],
          });
        } catch (error) {
          console.log('🚀  error:', error);
          await AsyncStorage.removeItem('userToken');
        }
      }
    };

    loadStoredToken();
  }, []);

  const onImageLoad = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.back(1),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <LinearGradient
      colors={['#EC80B4', '#3F95F2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        <SafeAreaView
          style={{
            height: '100%',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <LogoTitle />
          <ImageDescription onImageLoad={onImageLoad} />
          <SocialEmailLogin navigateToSignUp={() => navigation.navigate('SignUpLogin')} />
          <TermsPrivacyPolicy />
        </SafeAreaView>
      </Animated.View>
    </LinearGradient>
  );
}
