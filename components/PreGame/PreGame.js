import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';

export default function PreGame({ myData, opponentData }) {
  const leftCardTranslateX = useSharedValue(-500);
  const rightCardTranslateX = useSharedValue(500);
  const vsScale = useSharedValue(0);

  // Animated styles for player cards
  const leftCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: leftCardTranslateX.value }],
    };
  });

  const rightCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: rightCardTranslateX.value }],
    };
  });

  // Animated style for VS image
  const vsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: vsScale.value }],
    };
  });

  // Start animations when component mounts
  useEffect(() => {
    leftCardTranslateX.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    rightCardTranslateX.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    vsScale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.back(1.5)),
    });
  }, []);

  const renderPlayerCard = (userData, isOpponent) => {
    return (
      <View
        style={{
          flexDirection: isOpponent ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: '#3F95F2',
          borderRadius: 20,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'poppins-bold',
                fontSize: RFValue(18),
                textTransform: 'capitalize',
              }}
            >
              {userData?.name || ''}
            </Text>
            {userData?.playerInformation?.country && (
              <CountryFlag isoCode={userData?.playerInformation?.country} size={14} />
            )}
          </View>

          <View
            style={{
              width: 170,
              padding: 5,
              backgroundColor: 'white',
              //   paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 30,
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              //   justifyContent: 'center',
              paddingLeft: 10,
              marginTop: 10,
            }}
          >
            <Ionicons name='trophy-outline' size={20} color='#FDD92C' />
            <Text
              style={{
                color: '#3F95F2',
                fontFamily: 'poppins-semiBold',
                fontWeight: 'bold',
                fontSize: RFValue(12),
              }}
            >
              Rating: {userData?.playerInformation?.elo?.rating}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri:
                userData?.playerInformation?.avatar ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM6A1erx9khLr3mjq5FxsfMqW6vf5b8lvlmcqG88p-w&s',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#EC80B4', '#3F95F2']}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 20,
            marginVertical: 120,
            borderRadius: 25,
            justifyContent: 'space-between',
          }}
        >
          <Animated.View style={[rightCardStyle]}>{renderPlayerCard(myData, false)}</Animated.View>
          <Animated.View
            style={[
              {
                alignItems: 'center',
                marginVertical: 20,
              },
              vsStyle,
            ]}
          >
            <Image
              source={require('../../assets/vs_icon.png')}
              style={{ width: 100, height: 100 }}
            />
            <Text
              style={{
                color: '#5E6064',
                fontFamily: 'poppins-regular',
                fontSize: RFValue(14),
                marginTop: 5,
              }}
            >
              Preparing stage for battle...
            </Text>
          </Animated.View>
          <Animated.View style={[leftCardStyle]}>
            {renderPlayerCard(opponentData, true)}
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
