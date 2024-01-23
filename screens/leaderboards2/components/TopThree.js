import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Animated, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

export default function TopThree({ data }) {
  const swapFirstAndSecond = [data[1], data[0], data[2]];

  const renderAvatar = ({ name, score, avatar, country, placement }) => {
    let borderColor = 'transparent';

    if (placement === 2) borderColor = '#FFBC3A'; // Gold
    if (placement === 1) borderColor = '#C0C0C0'; // Silver
    if (placement === 3) borderColor = '#AE854D'; // Bronze

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: placement === 2 ? -10 : 0, // Lift up the first place avatar
        }}
      >
        <View
          style={{
            transform: placement === 2 ? [{ translateY: -10 }] : [], // Additional lift for the first place avatar
          }}
        >
          <Image
            source={{
              uri: avatar,
            }}
            style={{
              width: placement === 2 ? 90 : 80,
              height: placement === 2 ? 90 : 80,
              borderRadius: 100,
              borderWidth: 2,
              borderColor,
            }}
          />
          {placement === 2 && (
            <FontAwesome5
              style={{
                position: 'absolute',
                top: -35,
                left: '35%',
              }}
              name='chess-king'
              size={28}
              color='#FFBC3A'
            />
          )}
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <Text
            style={{
              color: '#444069',
              fontFamily: 'Roboto-Bold',
              fontWeight: 500,
            }}
          >
            {name}
          </Text>
          {country && <CountryFlag isoCode={country} size={13} />}
        </View>
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            backgroundColor: borderColor,
            borderWidth: 1,
            borderColor: '#fff',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <MaterialCommunityIcons name='star-circle' size={16} color='#FBA917' />
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Roboto-Bold',
              color: '#fff',
            }}
          >
            {Math.floor(score)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 20,
      }}
    >
      {swapFirstAndSecond.map((item, index) => {
        console.log('🚀  item:', item);
        if (!item) return null;

        return (
          <Animated.View
            key={index}
            style={{
              opacity: item.opacity,
              transform: [{ translateY: item.translateY }],
            }}
          >
            {renderAvatar(
              {
                name: item.username,
                score: item.averageRating,
                avatar: item.profile.avatar,
                country: item.profile.country,
                placement: index + 1,
              },
              index + 1,
            )}
          </Animated.View>
        );
      })}
    </View>
  );
}
