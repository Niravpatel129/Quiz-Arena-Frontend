import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { newRequest } from '../../api/newRequest';
import formatLastActive from '../../helpers/formatLastActive';

export default function MatchHistory2() {
  const [matchHistory, setMatchHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const getMatchHistory = async () => {
      const res = await newRequest.get('/matchHistory');
      setUserId(res.data?.userId);

      const animatedMatchHistory = res.data.matchHistory.map((item) => ({
        ...item,
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(50),
      }));
      setMatchHistory(animatedMatchHistory);

      animatedMatchHistory.forEach((_, index) => {
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.parallel([
            Animated.timing(animatedMatchHistory[index].opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(animatedMatchHistory[index].translateY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });

      setLoading(false);
    };

    getMatchHistory();
  }, []);

  const renderMatchBlock = ({ category, players, startTime, winnerId, loserId }) => {
    let colors = ['#CCB6FF', '#9769FF'];
    let shadowColor = 'rgba(169, 131, 255, 0.50)';
    let didUserWin = winnerId === userId;
    let UserData = players.find((player) => player.id === userId);
    console.log('🚀  UserData:', UserData);
    let opponentData = players.find((player) => player.id !== userId);

    if (!didUserWin) {
      colors = ['#FFB6B6', '#FF9696'];
      shadowColor = 'rgba(255, 150, 150, 0.50)';
    }

    // if (loserId === userId) {
    //   colors = ['#CCB6FF', '#9769FF'];
    // }

    // lose colors

    return (
      <LinearGradient
        colors={colors}
        style={{
          flex: 1,
          padding: 16,
          maxHeight: 180,
          alignItems: 'stretch',
          justifyContent: 'space-between',
          borderRadius: 16,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
          shadowColor: shadowColor,
          elevation: 5,
        }}
      >
        {loading && <ActivityIndicator size='large' color='#5E6064' style={{ marginTop: 20 }} />}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(225,225,225,.5)',
            borderRadius: 20,
            padding: 10,
            marginBottom: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'poppins-semiBold',
              fontSize: 14,
              textTransform: 'capitalize',
            }}
          >
            {category}
          </Text>
          <Text
            style={{
              color: didUserWin ? '#2CC672' : '#FF0000',
              fontFamily: 'poppins-semiBold',
              fontSize: 14,
            }}
          >
            {didUserWin ? 'Victory' : 'Defeat'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              // reverse
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PublicProfile', { userId: UserData.id });
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: 'white',
                  marginHorizontal: 4,
                }}
                source={{
                  uri:
                    UserData?.playerInformation?.avatar ||
                    'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
                }}
              ></Image>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'space-between',
                marginVertical: 4,
                alignItems: 'flex-start',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'poppins-semiBold',
                    fontSize: 8,
                    textTransform: 'capitalize',
                  }}
                >
                  {UserData?.name}
                </Text>
                {UserData.playerInformation?.country && (
                  <CountryFlag isoCode={UserData?.playerInformation?.country} size={10} />
                )}
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'poppins-regular',
                  fontSize: 10,
                }}
              >
                {UserData?.score} Points
              </Text>
            </View>
          </View>
          <View
            style={{
              borderRadius: 50,
              //   padding: ,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              padding: 6,
              fontFamily: 'poppins-semiBold',
              marginHorizontal: 10,
              borderWidth: 1,
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'poppins-semiBold',
                fontSize: 10,
              }}
            >
              VS
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              // reverse
              flexDirection: 'row-reverse',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PublicProfile', { userId: opponentData.id });
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: 'white',
                  marginHorizontal: 4,
                }}
                source={{
                  uri:
                    opponentData.playerInformation.avatar ||
                    'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*',
                }}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'space-between',
                marginVertical: 4,
                alignItems: 'flex-end',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {opponentData.playerInformation?.country && (
                  <CountryFlag isoCode={opponentData?.playerInformation?.country} size={10} />
                )}
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'poppins-semiBold',
                    fontSize: 8,
                    textTransform: 'capitalize',
                  }}
                >
                  {opponentData?.name}
                </Text>
              </View>

              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'poppins-regular',
                  fontSize: 10,
                }}
              >
                {opponentData?.score} Points
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 10,
            gap: 5,
          }}
        >
          <Ionicons name='time-outline' size={16} color='white' />
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'poppins-regular',
              fontSize: 10,
              marginTop: 4,
            }}
          >
            {formatLastActive(startTime)}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <View
        style={{
          height: '100%',
          backgroundColor: 'white',
          padding: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            marginTop: 10,
            marginBottom: 10,
            color: '#5E6064',
            fontFamily: 'poppins-semiBold',
          }}
        >
          Match History
        </Text>
        <View
          style={{
            gap: 10,
            height: '100%',
          }}
        >
          {matchHistory?.map((item, index) => {
            return (
              <Animated.View
                style={{
                  height: 180,
                  opacity: item.opacity,
                  transform: [{ translateY: item.translateY }],
                }}
                key={item._id}
              >
                {renderMatchBlock(item)}
              </Animated.View>
            );
          })}

          {!loading && matchHistory.length === 0 && (
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#5E6064',
                  fontFamily: 'poppins-semiBold',
                }}
              >
                You have not played any matches. Play a match to see your match history
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
