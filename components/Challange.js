import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';

export default function Challange() {
  const renderPlayerCard = (player) => {
    return (
      <View
        style={{
          backgroundColor: '#3a4761',
          margin: Spacing.margin.base,
          borderColor: '#67728f',
          borderWidth: 2,
          borderRadius: Spacing.borderRadius.lg,
          minHeight: 190,
          padding: Spacing.padding.base,
          paddingLeft: Spacing.margin.xl,
          paddingVertical: Spacing.padding.lg,
          position: 'relative',
        }}
      >
        <Text
          style={{
            color: '#69829c',
            fontSize: FontSize.md,
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
          }}
        >
          Playing from USA florida
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: Spacing.margin.xl,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontSize: FontSize.xl,
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
            }}
          >
            Alex
          </Text>
          <CountryFlag isoCode='de' size={25} />
        </View>

        <Text
          style={{
            color: '#c6c082',
            fontSize: FontSize.md,
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
          }}
        >
          Expert
        </Text>

        <View
          style={{
            borderWidth: 2,
            borderColor: '#67728f',
            backgroundColor: '#3a4761',
            position: 'absolute',
            right: Spacing.margin.base,
            bottom: Spacing.margin.xl,
            height: '95%',
            width: '40%',
            borderRadius: Spacing.borderRadius.lg,
            overflow: 'hidden',
          }}
        >
          <Image
            source={{
              uri: 'https://storage.googleapis.com/pai-images/04a4d16220a645408362ae47deb07737.jpeg',
            }}
            style={{
              height: '100%',
              width: '100%',
              //   borderRadius: Spacing.borderRadius.lg,
              overflow: 'hidden',
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: '100%' }}
    >
      <SafeAreaView
        style={{
          height: '100%',
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 80,
            borderRadius: Spacing.borderRadius.xxl,
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fd5e5c',
          }}
        >
          <Ionicons name='close' size={28} color={Colors.primary} />
        </TouchableOpacity>

        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {renderPlayerCard({
            preTag: 'playing from USA florida',
            playerName: 'Alex Johnson',
            country: 'us',
            subtext: 'Expert',
          })}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',

              margin: Spacing.margin.xl,
            }}
          >
            <Text
              style={{
                color: '#f4a42d',
                fontSize: 62,
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
              }}
            >
              VS
            </Text>
            <Text
              style={{
                color: Colors.primary,
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
              }}
            >
              Prepraring Match
            </Text>
          </View>
          {renderPlayerCard({
            preTag: 'playing from USA florida',
            playerName: 'Alex Johnson',
            country: 'us',
            subtext: 'Expert',
          })}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
