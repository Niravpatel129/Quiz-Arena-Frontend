import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Platform, SafeAreaView, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import { calculateExp } from '../helpers/calculateExp';
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';

export default function Challange({ myData, opponentData, category }) {
  const [width, setWidth] = React.useState(Dimensions.get('window').width);
  const topCardAnim = useState(new Animated.Value(-800))[0];
  const bottomCardAnim = useState(new Animated.Value(800))[0];
  const isWeb = Platform.OS === 'web';
  const scaleAnim = new Animated.Value(0.5);
  const opacityAnim = new Animated.Value(0);

  const onImageLoad = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const onChange = () => {
      setWidth(Dimensions.get('window').width);
    };

    if (isWeb) Dimensions?.addEventListener('change', onChange);

    // Animate
    Animated.parallel([
      Animated.timing(topCardAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 5,
        bounciness: 10,
      }),
      Animated.timing(bottomCardAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 5,
        bounciness: 10,
      }),
    ]).start();

    return () => {
      if (isWeb) Dimensions?.removeEventListener('change', onChange);
    };
  }, []);

  const renderOpponentCard = (
    { tag, playerName, country, elo, experience, avatar, isSecond },
    index,
  ) => {
    console.log('🚀  isSecond:', isSecond);
    const cardAnim = index === 1 ? topCardAnim : bottomCardAnim;

    const translateX = cardAnim;

    return (
      <Animated.View
        style={{
          transform: [{ translateX }],
          backgroundColor: '#3a4761',
          margin: Spacing.margin.base,
          borderColor: '#67728f',
          borderWidth: 2,
          borderRadius: Spacing.borderRadius.lg,
          minHeight: 190,
          padding: Spacing.padding.base,
          paddingLeft: Spacing.margin.xl,
          paddingVertical: Spacing.padding.lg,
          position: 'relative',
          flexDirection: index === 2 ? 'row-reverse' : 'row',
        }}
      >
        <View>
          <Text
            style={{
              color: '#69829c',
              fontSize: FontSize.md,
              fontWeight: 'bold',
              fontFamily: 'poppins-regular',
              marginBottom: 10,
            }}
          >
            {tag || 'Rookie'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}
          >
            {isSecond && (
              <CountryFlag
                style={{
                  marginBottom: 3,
                }}
                isoCode={country.toLowerCase() || 'aq'}
                size={20}
              />
            )}
            <Text
              style={{
                color: Colors.primary,
                fontSize: FontSize.xl,
                fontWeight: 'bold',
                fontFamily: 'poppins-regular',
              }}
            >
              {playerName || 'Alex'}
            </Text>
            {!isSecond && (
              <CountryFlag
                style={{
                  marginBottom: 3,
                }}
                isoCode={country.toLowerCase() || 'aq'}
                size={20}
              />
            )}
          </View>

          <Text
            style={{
              color: '#c6c082',
              fontSize: FontSize.md,
              fontWeight: 'bold',
              fontFamily: 'poppins-regular',
              maxWidth: 200,
            }}
          >
            {capitalizeFirstLetter(category) || 'logos'}
          </Text>
          <Text
            style={{
              color: '#c6c082',
              fontSize: FontSize.md,
              fontWeight: 'bold',
              fontFamily: 'poppins-regular',
            }}
          >
            Rating: {elo || 1200}
          </Text>
        </View>

        <View
          style={{
            borderWidth: 2,
            borderColor: '#67728f',
            backgroundColor: '#3a4761',
            position: 'absolute',
            left: isWeb && index === 2 ? Spacing.margin.base : '',
            right: index !== 2 ? Spacing.margin.base : Spacing.margin.base,
            bottom: Spacing.margin.xl,
            height: '95%',
            width: '40%',
            borderRadius: Spacing.borderRadius.lg,
            overflow: 'hidden',
          }}
        >
          <Animated.Image
            onLoad={onImageLoad}
            source={{
              uri:
                avatar ||
                'https://storage.googleapis.com/pai-images/04a4d16220a645408362ae47deb07737.jpeg',
            }}
            style={{
              height: '100%',
              width: '100%',
              overflow: 'hidden',
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: index === 2 && 0,
              right: index !== 2 && 0,
              color: '#fff',
              borderRadius: Spacing.borderRadius.sm,
              backgroundColor: '#1b173c',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingBottom: 8,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: FontSize.sm,
                fontFamily: 'poppins-regular',
              }}
            >
              Lv
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: FontSize.base,
                fontWeight: 'bold',
                fontFamily: 'poppins-regular',
              }}
            >
              {calculateExp(experience) || 1}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: '100%', paddingHorizontal: width > 1300 ? 400 : 0 }}
    >
      <SafeAreaView
        style={{
          height: '100%',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {renderOpponentCard(
            {
              tag: myData.playerInformation.tag,
              playerName: myData.name,
              country: myData.playerInformation.country,
              elo: myData.playerInformation.elo.rating,
              experience: myData.playerInformation.experience,
              avatar: myData.playerInformation?.avatar,
              isSecond: false,
            },
            1,
          )}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',

              margin: Spacing.margin.xl,
            }}
          >
            <Text
              style={{
                color: '#f4a42d',
                fontSize: 62,
                fontWeight: 'bold',
                fontFamily: 'poppins-regular',
              }}
            >
              VS
            </Text>
            <Text
              style={{
                color: Colors.primary,
                fontWeight: 'bold',
                fontFamily: 'poppins-regular',
              }}
            >
              Prepraring Match
            </Text>
          </View>
          {renderOpponentCard(
            {
              tag: opponentData.playerInformation.tag,
              playerName: opponentData.name,
              country: opponentData.playerInformation.country,
              elo: opponentData.playerInformation.elo.rating,
              experience: opponentData.playerInformation.experience,
              avatar: opponentData.playerInformation?.avatar,
              isSecond: true,
            },
            2,
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
