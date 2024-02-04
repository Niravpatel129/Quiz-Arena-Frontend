import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { newRequest } from '../../../api/newRequest';
import CustomButton from './CustomButton';
import RenderKing from './RenderKing';

export default function FeederHome({ categoryName, handleEnter }) {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
  const [currentFeederKing, setCurrentFeederKing] = React.useState(null);

  useEffect(() => {
    const fetchFeederKing = async () => {
      const response = await newRequest.get(`/feeder/king/${categoryName.replace(/ /g, '-')}`);

      setCurrentFeederKing(response.data);
    };

    fetchFeederKing();
  }, [categoryName]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      delay: 200,
    }).start();
  }, [fadeAnim]);

  return (
    <AnimatedImageBackground
      source={{
        uri: 'https://cdn.discordapp.com/attachments/1110409819808079982/1202937279581134958/background.png?ex=65cf45a4&is=65bcd0a4&hm=0d4e4b94de5bd0f31709f4a3dfd9b219e6e3099638abc675d4ca44e1d457e9a1',
      }}
      style={{ flex: 1, opacity: fadeAnim, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            height: '100%',
            margin: 30,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ position: 'absolute', top: 0, left: 0, padding: 0, zIndex: 1 }}
          >
            <Ionicons name='close' size={30} color='#9f9f9f' />
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Text
              style={{
                fontFamily: 'poppins-semiBold',
                fontSize: 30,
                textAlign: 'center',
                color: '#fff',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 3,
              }}
            >
              Feeder Mode
            </Text>
            <Text
              style={{
                fontFamily: 'poppins-semiBold',
                fontSize: 22,
                textAlign: 'center',
                color: '#fff',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 3,
                textTransform: 'capitalize',
              }}
            >
              {categoryName || 'General Knowledge'}
            </Text>
            <Image
              source={{
                uri: 'https://cdn.discordapp.com/attachments/1201815017612398662/1202213592493981787/IMG_3419.webp?ex=65cca3a8&is=65ba2ea8&hm=3b03405ac15ecc894bab9a242ba73b08301b8cd8e5cb8dd634f5dbef8290f006&',
              }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 20,
              }}
            />

            {currentFeederKing && (
              <RenderKing currentFeederKing={currentFeederKing} categoryName={categoryName} />
            )}
            <View
              style={{
                marginTop: 40,
                width: '100%',
              }}
            >
              <CustomButton
                title='Enter'
                onPress={() => {
                  handleEnter();
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </AnimatedImageBackground>
  );
}
