import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Image, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export default function LeaderboardsList({ data }) {
  const leaderboardItem = ({ placement, name, avatar, country, elo }) => {
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
            {Math.floor(elo)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        gap: 8,
        marginVertical: 30,
      }}
    >
      {data.map((item, index) => {
        return (
          <Animated.View
            key={index}
            style={{
              opacity: item.opacity,
              transform: [{ translateY: item.translateY }],
            }}
          >
            {leaderboardItem({
              placement: index + 4,
              id: item._id,
              name: item.username,
              avatar: item.profile.avatar,
              country: item.profile.country,
              elo: item.averageRating,
            })}
          </Animated.View>
        );
      })}
    </View>
  );
}
