import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export default function LeaderboardsList({ data }) {
  const navigator = useNavigation();

  const leaderboardItem = ({ placement, name, avatar, country, elo, id }) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: '#C0E1FD',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Bold',
              }}
            >
              {placement}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigator.navigate('PublicProfile', { userId: id });
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#FFBC3A',
                  overflow: 'hidden',
                }}
                source={{
                  uri:
                    avatar ||
                    'https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontFamily: 'poppins-regular',
                textTransform: 'capitalize',
                fontSize: 14,
              }}
            >
              {name}
            </Text>
            <CountryFlag isoCode={country || 'aq'} size={14} />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name='trophy-outline' size={24} color='gold' />
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
            }}
          >
            {Math.floor(elo || 0)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        gap: 8,
        width: '100%',
      }}
    >
      {data.map((item, index) => {
        return (
          <Animated.View
            key={index}
            style={{
              width: '100%',
              opacity: item.opacity || 1,
              transform: [{ translateY: item.translateY || 0 }],
            }}
          >
            {leaderboardItem({
              placement: index + 1,
              id: item.userId,
              name: item.username,
              avatar: item.avatar,
              country: item.country,
              elo: item.rating,
            })}
          </Animated.View>
        );
      })}
    </View>
  );
}
