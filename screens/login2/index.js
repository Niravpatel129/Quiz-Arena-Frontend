import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { newRequest } from '../../api/newRequest';
import SocialButton from '../../components/SocialButton/SocialButton';
import { useSocket } from '../../context/socket/SocketContext';

export default function Login({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [buttonAnim] = useState(new Animated.Value(0));
  const socket = useSocket();

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

          socket.ConnectSocket();

          navigation.reset({
            index: 0,
            routes: [{ name: 'Categories' }],
          });
        } catch (error) {
          console.log('🚀  error:', error);
          console.log('🚀  token is not valid', token);
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
      colors={['#0f0c29', '#302b63', '#24243e']}
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
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ scale: scaleAnim }],
            }}
          >
            <Text
              style={{
                fontSize: 50,
                fontWeight: 700,
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Inter-Black',
                fontWeight: 700,
                flexDirection: 'row',
              }}
            >
              Quiz Arena
            </Text>
            <Ionicons
              style={{
                paddingLeft: 10,
                marginTop: 10,
              }}
              name='book'
              size={40}
              color='white'
            />
          </Animated.View>
          <View
            style={{
              marginTop: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              onLoad={onImageLoad}
              style={{
                width: 280,
                height: 280,
              }}
              source={{
                uri: 'https://cdn.discordapp.com/attachments/1085326974353952898/1190996477250646046/DALL_E_2023-12-31_07.31.43_-_A_logo_for__Quiz_Arena__depicted_from_a_straight__front-facing_angle__suitable_for_high-resolution_displays_and_branding_materials._The_logo_should_fe-removebg-preview.png?ex=65a3d4e7&is=65915fe7&hm=35760445baa19b994baaaa5bdc8737eb3f32849ac99d38e8b0c4db66c5484836&',
                headers: {
                  Accept: '*/*',
                },
              }}
            />

            <Text
              style={{
                fontSize: 18,
                width: 400,
                fontWeight: 700,
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Inter-Black',
                fontWeight: 700,
              }}
            >
              Where knowledge meets challenge
            </Text>

            <Animated.View
              style={{
                marginVertical: 20,
                width: '90%',
                gap: 8,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
                opacity: buttonAnim,
              }}
            >
              <SocialButton variation={'Facebook'} />
              {/* <SocialButton variation={'Google'} /> */}
              <SocialButton variation={'Apple'} />

              <TouchableOpacity
                onPress={() => {}}
                style={{
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'Inter-SemiBold',
                    fontWeight: 600,
                    textDecorationLine: 'underline',
                  }}
                  onPress={() => {
                    navigation.navigate('SignUpLogin');
                  }}
                >
                  Sign in with Email Address
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: 40,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 12,
                  }}
                >
                  By continuing, you agree to the
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://quizarena.gg/privacy');
                  }}
                  style={{
                    marginLeft: 2,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 12,
                      textDecorationLine: 'underline',
                    }}
                  >
                    Terms and Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </LinearGradient>
  );
}
