import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Animated, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { newRequest } from '../../api/newRequest';
import Trophies from '../../components/Trophies/Trophies';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import formatLastActive from '../../helpers/formatLastActive';
import ChallangeModal from '../ChallangeModal/ChallangeModal';

export default function ProfileComponent({ userId }) {
  const [userData, setUserData] = React.useState({});
  const scaleAnim = new Animated.Value(0.5);
  const opacityAnim = new Animated.Value(0);
  const [selectedFriendId, setSelectedFriendId] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  console.log(userData);

  const onImageLoad = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fetchUser = async () => {
    const userRes = await newRequest.get(`/users/${userId}`);

    setUserData(userRes.data);
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleChallange = async () => {
    try {
      showModal();
      setSelectedFriendId(userId);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c2141' }}>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <ChallangeModal
          opponentUserId={selectedFriendId}
          isModalVisible={isModalVisible}
          hideModal={hideModal}
        />
        {!userId && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileEdit');
            }}
          >
            <FontAwesome
              name='gear'
              size={24}
              color='white'
              style={{ marginTop: 20, marginLeft: 20 }}
            />
          </TouchableOpacity>
        )}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
            position: 'relative',
            marginTop: 20,
            paddingTop: 20,
            minHeight: 500,
          }}
        >
          <View
            style={{
              minHeight: 200,
            }}
          >
            <Animated.Image
              source={{
                uri: userData?.avatar,
                headers: {
                  Accept: '*/*',
                },
              }}
              style={{
                borderRadius: 100,
                width: 200,
                height: 200,
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              }}
              onLoad={onImageLoad}
              onError={(error) => {
                console.log('🚀 Error loading image:', error);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>
              {userData.username && <>{capitalizeFirstLetter(userData?.username)}</>}
            </Text>
            {userData?.country && (
              <CountryFlag isoCode={userData?.country} size={18} style={{ marginLeft: 10 }} />
            )}
          </View>
          <Text style={{ color: 'gray', fontSize: 18, marginTop: 3 }}>Element of Surprise</Text>
          <Text style={{ color: 'lightgray', fontSize: 18, marginTop: 30 }}>
            <Ionicons name='location' size={18} color='lightgray' />
            Last Active {formatLastActive(userData?.lastActive)}
          </Text>
          <View
            style={{
              backgroundColor: '#1d284b',
              width: 300,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
              marginTop: 30,
              borderRadius: 22,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Average Rating: {userData?.averageRating}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
            <TouchableOpacity
              onPress={() => {
                handleChallange();
              }}
              style={{
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                paddingHorizontal: 20,
                backgroundColor: '#c73dce',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Challenge</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                paddingHorizontal: 20,
                backgroundColor: '#ce3d3d',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  chattingWithId: userId,
                })
              }
              style={{
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                paddingHorizontal: 20,
                backgroundColor: '#3dce6d',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 30, width: '100%' }}>
            <View
              style={{ justifyContent: 'center', gap: 20, flexDirection: 'row', marginTop: 20 }}
            >
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                    marginBottom: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Total Games
                </Text>
                <View
                  style={{
                    padding: 18,
                    backgroundColor: '#1d284b',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 100,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Inter-Black' }}>
                    {userData?.totalGames}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                    marginBottom: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Win Rate
                </Text>
                <View
                  style={{
                    padding: 18,
                    backgroundColor: '#1d284b',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 100,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontFamily: 'Inter-Black',
                    }}
                  >
                    {userData?.winRate?.toFixed(0)}%
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                    marginBottom: 10,
                    fontWeight: 'bold',
                  }}
                >
                  Avg Score
                </Text>
                <View
                  style={{
                    padding: 18,
                    backgroundColor: '#1d284b',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 100,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontFamily: 'Inter-Black',
                    }}
                  >
                    {userData?.winRate?.toFixed(0)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 30,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trophies />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
