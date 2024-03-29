import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { newRequest } from '../../api/newRequest';
import AvatarPicker from '../../components/AvatarPicker/AvatarPicker';
import Trophies from '../../components/Trophies/Trophies';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import formatLastActive from '../../helpers/formatLastActive';

export default function ProfileScreen({ navigation, route }) {
  const [userData, setUserData] = React.useState({});

  const fetchUser = async () => {
    try {
      const userRes = await newRequest.get(`/users/${route?.params?.userId}`);

      setUserData(userRes.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [route.params?.userId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c2141' }}>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {!route?.params?.userId && (
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
          }}
        >
          <View>
            <AvatarPicker defaultImage={userData?.avatar} disablePress={route?.params?.userId} />
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
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 700 }}>
              Average Rating: {userData?.averageRating}
            </Text>
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
                    fontWeight: 700,
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
                    fontWeight: 700,
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
                    fontWeight: 700,
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
          {/* {route?.params?.userId && (
            <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 44, fontWeight: 700, marginBottom: 10 }}>
                You vs
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    backgroundColor: 'lightgray',
                    borderRadius: 10,
                    width: 150,
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 48, fontWeight: 700, color: '#1d284b' }}>1 W</Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'lightgray',
                    borderRadius: 10,
                    width: 150,
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 48, fontWeight: 700, color: '#1d284b' }}>11 L</Text>
                </View>
              </View>
            </View>
          )} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
