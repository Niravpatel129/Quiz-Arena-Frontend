import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { newRequest } from '../../api/newRequest';
import AvatarPicker from '../../components/AvatarPicker/AvatarPicker';
import Trophies from '../../components/Trophies/Trophies';
import formatLastActive from '../../helpers/formatLastActive';

export default function ProfileScreen({ navigation, route }) {
  const [userData, setUserData] = React.useState({});

  const fetchUser = async () => {
    const userRes = await newRequest.get(`/users/${route?.params?.userId}`);

    setUserData(userRes.data);
  };
  useEffect(() => {
    fetchUser();
  }, [route.params?.userId]);

  if (!userData.username) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1c2141' }}>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {!route?.params?.userId && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileEdit');
            }}
          >
            <Ionicons
              name='share'
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
          }}
        >
          <View>
            <AvatarPicker defaultImage={userData.avatar} disablePress={route?.params?.userId} />
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              if (route?.params?.userId) return;
              handleProfileAvatarEdit();
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                marginTop: 20,
                borderWidth: 8,
                borderColor: 'white',
              }}
              source={{ uri: userData.avatar }}
            ></Image>
          </TouchableOpacity> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>{userData.username}</Text>
            <CountryFlag isoCode={userData.country} size={18} style={{ marginLeft: 10 }} />
          </View>
          <Text style={{ color: 'gray', fontSize: 18, marginTop: 3 }}>Element of Surprise</Text>
          <Text style={{ color: 'lightgray', fontSize: 18, marginTop: 30 }}>
            <Ionicons name='location' size={18} color='lightgray' />
            Last Active {formatLastActive(userData.lastActive)}
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
              Average Rating: {userData.averageRating}
            </Text>
          </View>
          {route.params?.userId && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
              <TouchableOpacity
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
                    chattingWithId: route?.params?.userId,
                  })
                }
                style={{
                  borderRadius: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                  paddingHorizontal: 20,
                  backgroundColor: '#ce753d',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 18 }}>Chat</Text>
              </TouchableOpacity>
            </View>
          )}

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
                    {userData.totalGames}
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
                    {userData.winRate.toFixed(0)}%
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
                    {userData.winRate.toFixed(0)}
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
          {route?.params?.userId && (
            <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 44, fontWeight: 'bold', marginBottom: 10 }}>
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
                  <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#1d284b' }}>1 W</Text>
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
                  <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#1d284b' }}>11 L</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
