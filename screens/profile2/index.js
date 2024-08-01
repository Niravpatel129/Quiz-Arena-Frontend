import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';
import { newRequest } from '../../api/newRequest';
import formatLastActive from '../../helpers/formatLastActive';
import CombinedModal from './components/CombinedModal';

export default function Profile2({ userId }) {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState(userData?.username);
  const [selectedAvatar, setSelectedAvatar] = useState(userData?.avatar);

  // Bottom Sheet
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [userData]);

  useEffect(() => {
    const fetchUser = async () => {
      const userRes = await newRequest.get(`/users/${userId}`);
      setUserData(userRes.data);
    };

    fetchUser();
  }, []);

  const handleSave = (avatar, username) => {
    setSelectedAvatar(avatar);
    setNewUsername(username);
    setModalVisible(false);
    // Update user avatar and username on the server
    newRequest
      .put(`/users/avatar`, { avatar, username })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully',
        });
      })
      .catch((e) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred while updating your profile',
        });
        console.log(e);
      });
  };

  const renderTrophyCard = ({ title, image }) => {
    console.log('🚀  image:', image);
    if (image.includes('cloudinary') || image.includes('discordapp')) {
      image = 'https://cdn-icons-png.flaticon.com/512/476/476851.png';
    }

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
          cachePolicy='memory-disk'
          contentFit='contain'
          source={{
            uri:
              image ||
              'https://res.cloudinary.com/dwu4qop1o/image/upload/v1708638053/Style1_1_gjosgx.png',
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

  if (!userData) {
    return null;
  }
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
    <BottomSheetModalProvider>
      <View
        style={{
          height: '100%',
          backgroundColor: 'white',
        }}
      >
        <CombinedModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          defaultUsername={newUsername}
          defaultAvatar={selectedAvatar}
        />

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
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (userId) return;
                setModalVisible(true);
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
                  cachePolicy='memory-disk'
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 150,
                  }}
                  source={{
                    uri:
                      selectedAvatar ||
                      userData?.avatar ||
                      'https://thumbs.dreamstime.com/b/astronaut-cat-wearing-space-suit-elements-image-furnished-nasa-first-trip-to-space-mixed-media-167670791.jpg',
                  }}
                ></Image>
              </Animated.View>
            </TouchableOpacity>

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
              <TouchableOpacity
                onPress={() => {
                  if (userId) return;
                  setModalVisible(true);
                }}
              >
                <Text
                  style={{
                    color: '#262625',
                    fontSize: 24,
                    fontFamily: 'poppins-regular',
                  }}
                >
                  {newUsername || userData?.username}
                </Text>
              </TouchableOpacity>
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

            {/* Bottom Sheet Button */}
            <Button title='Open Bottom Sheet' onPress={handlePresentModalPress} />
          </ScrollView>
        </SafeAreaView>

        {/* Bottom Sheet */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
