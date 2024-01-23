import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

const topThree = [
  {
    name: 'First Doe',
    score: 9010,
    country: 'ca',
    avatar:
      'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    placement: 1,
  },
  {
    name: 'Second Doe',
    score: 4200,
    country: 'ca',
    avatar:
      'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    placement: 2,
  },

  {
    name: 'Third Doe',
    score: 1030,
    country: 'ca',
    avatar:
      'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    placement: 3,
  },
];

const arrangedAvatars = [topThree[1], topThree[0], topThree[2]]; // Silver, Gold, Bronze

export default function TopThree() {
  const renderAvatar = ({ name, score, avatar, country, placement }) => {
    let borderColor = 'transparent';

    if (placement === 1) borderColor = '#FFBC3A'; // Gold
    if (placement === 2) borderColor = '#C0C0C0'; // Silver
    if (placement === 3) borderColor = '#AE854D'; // Bronze

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: placement === 1 ? -10 : 0, // Lift up the first place avatar
        }}
      >
        <View
          style={{
            transform: placement === 1 ? [{ translateY: -10 }] : [], // Additional lift for the first place avatar
          }}
        >
          <Image
            source={{
              uri: avatar,
            }}
            style={{
              width: placement === 1 ? 90 : 80,
              height: placement === 1 ? 90 : 80,
              borderRadius: 100,
              borderWidth: 2,
              borderColor,
            }}
          />
          {placement === 1 && (
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
            gap: 5,
          }}
        >
          <Text
            style={{
              color: '#444069',
              fontFamily: 'Roboto',
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
            gap: 3,
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
              fontStyle: 'Roboto',
              color: '#fff',
              fontWeight: 400,
            }}
          >
            {score}
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
      {arrangedAvatars.map((item, index) => {
        return <>{renderAvatar(item, index + 1)}</>;
      })}
    </View>
  );
}
