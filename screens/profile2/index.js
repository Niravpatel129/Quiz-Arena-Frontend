import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { newRequest } from '../../api/newRequest';
import formatLastActive from '../../helpers/formatLastActive';

export default function Profile2({ userId }) {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });
  }, [userData]);

  useEffect(() => {
    const fetchUser = async () => {
      const userRes = await newRequest.get(`/users/${userId}`);
      setUserData(userRes.data);
    };

    fetchUser();
  }, []);

  const renderTrophyCard = ({ title, image }) => {
    return (
      <View
        key={title}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: '30%',
          },
        ]}
      >
        <Image
          source={{
            uri:
              image ||
              'https://cdn.discordapp.com/attachments/1110409819808079982/1199519044018114760/image__9_-removebg-preview.png?ex=65c2d62a&is=65b0612a&hm=118f84d71691ba493e41d37e99b1edc5beceeeadc90185f93a012dcb510d492a&',
          }}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <Text
          style={{
            marginTop: 10,
            fontFamily: 'poppins-bold',
            fontSize: 16,
            color: '#181A17',
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  const renderStatsCard = (title, value, variation) => {
    let colors;
    let icon;
    let shadowColor;

    if (variation === 1) {
      colors = ['#CCB6FF', '#9769FF'];
      shadowColor = 'rgba(169, 131, 255, 0.50)';
      icon = 'ios-star';
    }

    if (variation === 2) {
      colors = ['#FFD77F', '#FF9F43'];
      shadowColor = 'rgba(255, 159, 67, 0.50)';
      icon = 'ios-bonfire';
    }

    if (variation === 3) {
      colors = ['#1BEBB9', '#1A9B65'];
      shadowColor = 'rgba(27, 235, 185, 0.50)';
      icon = 'ios-trophy';
    }

    return (
      <LinearGradient
        colors={colors}
        style={{
          flex: 1,
          padding: 12,
          borderRadius: 12,
          shadowColor: shadowColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Ionicons name={icon} size={24} color='#fff' />
          <Text
            style={{
              color: '#fff',
              fontFamily: 'poppins-regular',
              fontWeight: 400,
              textAlign: 'center',
              fontSize: RFValue(13),
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'poppins-bold',
              fontWeight: 600,
              fontSize: 24,
            }}
          >
            {value}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  if (userId && !userData)
    return (
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text
          style={{
            opacity: 0.5,
          }}
        >
          Loading...
        </Text>
      </View>
    );

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
      }}
    >
      <SafeAreaView>
        {userId && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 20,
            }}
          >
            <Ionicons name='ios-arrow-back' size={24} color='#262625' />
          </TouchableOpacity>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            // marginVertical: 20,
            marginHorizontal: 10,
          }}
        >
          <Animated.View
            style={[
              animatedStyle,
              {
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <Image
              style={{
                width: 140,
                height: 140,
                borderRadius: 150,
              }}
              source={{
                uri:
                  userData?.avatar ||
                  'https://thumbs.dreamstime.com/b/astronaut-cat-wearing-space-suit-elements-image-furnished-nasa-first-trip-to-space-mixed-media-167670791.jpg',
              }}
            ></Image>
          </Animated.View>
          <View
            style={{
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 5,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: '#262625',
                fontSize: 24,
                fontFamily: 'poppins-regular',
              }}
            >
              {userData?.username}
            </Text>
            {userData?.country && <CountryFlag isoCode={userData?.country} size={20} />}
          </View>
          <Text
            style={{
              color: '#5E6064',
              fontSize: 13,
              fontFamily: 'poppins-regular',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            {/* Only show this if its last 5 days */}
            {new Date().getTime() - new Date(userData?.lastActive).getTime() < 432000000 ? (
              <>Last Active {formatLastActive(userData?.lastActive)}</>
            ) : null}
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#FF4646',
                fontSize: 14,
                fontFamily: 'poppins-regular',
              }}
            >
              Rookie | {userData?.experience} XP
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: '#EFF8FF',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderRadius: 100,
                marginTop: 10,
                paddingHorizontal: 16,
                gap: 5,
              }}
            >
              <Ionicons name='ios-star' size={24} color='#FDD92C' />
              <Text
                style={{
                  color: '#3F95F2',
                  fontFamily: 'poppins-bold',
                  fontWeight: 600,
                }}
              >
                Average Rating: {userData?.averageRating}
              </Text>
            </View>
          </View>
          {/* Cards */}
          <Animated.View
            style={[
              animatedStyle,
              {
                flexDirection: 'row',
                gap: 5,
                marginTop: 20,
              },
            ]}
          >
            {renderStatsCard('Games', userData?.totalGames || 0, 1)}
            {renderStatsCard('Win Rate', `${Math.floor(userData?.winRate || null)}%`, 2)}
            {renderStatsCard('Avg Score', 85, 3)}
          </Animated.View>
          <View
            style={{
              paddingBottom: 60,
            }}
          >
            <Text
              style={{
                marginTop: 20,
                color: '#5E6064',
                fontSize: 16,
                marginBottom: 10,
                fontFamily: 'poppins-bold',
              }}
            >
              Trophies
            </Text>

            <Animated.View
              style={[
                animatedStyle,
                {
                  backgroundColor: '#DCEDFD',
                  padding: 20,
                  borderRadius: 12,
                },
              ]}
            >
              <View
                style={[
                  {
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                    gap: 5,
                  },
                ]}
              >
                {renderTrophyCard({
                  title: 'Early Bird',
                  image:
                    'https://cdn.discordapp.com/attachments/1110409819808079982/1199519044018114760/image__9_-removebg-preview.png?ex=65c2d62a&is=65b0612a&hm=118f84d71691ba493e41d37e99b1edc5beceeeadc90185f93a012dcb510d492a&',
                })}
                {userData?.awards?.map((trophy) => {
                  return renderTrophyCard({
                    title: trophy.name,
                    image: trophy.image,
                  });
                })}
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
