import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter';
import formatLastActive from '../../../helpers/formatLastActive';

export default function RenderKing({ currentFeederKing }) {
  const feederKing = currentFeederKing[0];
  const previousFeederKing = currentFeederKing[1];

  return (
    <View
      style={{
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 20,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        Current King
      </Text>
      <Image
        source={{
          uri: feederKing.userDetails.profile.avatar,
        }}
        style={{
          width: 100,
          height: 100,
          marginBottom: 7,
          borderRadius: 15,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'poppins-semiBold',
            fontSize: 20,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          {capitalizeFirstLetter(feederKing.userDetails.username)}
        </Text>
        <CountryFlag
          style={{
            marginLeft: 6,
          }}
          isoCode={feederKing.userDetails.profile.country}
          size={14}
        />
      </View>
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 18,
          textAlign: 'center',
          color: 'lightgray',
        }}
      >
        Reached Round {feederKing.scoreAchieved}
      </Text>
      {previousFeederKing &&
        previousFeederKing.userDetails.username !== feederKing.userDetails.usernme && (
          <>
            <Text
              style={{
                fontFamily: 'poppins-semiBold',
                fontSize: 14,
                textAlign: 'center',
                color: '#fff',
                marginTop: 10,
              }}
            >
              Seat Taken from {capitalizeFirstLetter(previousFeederKing.userDetails.username)}
              <CountryFlag
                style={{
                  marginLeft: 6,
                }}
                isoCode={previousFeederKing.userDetails.profile.country}
                size={13}
              />
            </Text>
            <Text
              style={{
                fontFamily: 'poppins-semiBold',
                fontSize: 14,
                textAlign: 'center',
                color: 'lightgray',
              }}
            >
              {formatLastActive(feederKing?.updatedAt || previousFeederKing?.updatedAt)}
            </Text>
          </>
        )}
    </View>
  );
}
