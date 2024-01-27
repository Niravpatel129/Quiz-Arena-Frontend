import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import DividerHeader from './DividerHeader';

export default function UserProfile() {
  return (
    <View>
      <DividerHeader headerText={'Your Profile'} />
      <LinearGradient
        colors={['#EC80B4', '#3F95F2']}
        style={{
          borderRadius: 16,
          shadowColor: '#3E75D9',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 5,
          paddingVertical: 20,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            source={{
              uri: 'https://sm.mashable.com/mashable_sea/photo/default/man-fakes-death-cat-q6u_2z9w.png',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: '#F8D2E6',
              marginRight: 13,
            }}
          ></Image>
        </View>

        <View
          style={{
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
                fontFamily: 'poppins-bold',
                fontSize: 20,
                color: '#fff',
              }}
            >
              William Jones
            </Text>

            <CountryFlag isoCode='us' size={16} />
          </View>

          <Text
            style={{
              fontFamily: 'poppins-semiBold',
              fontSize: 14,
              color: '#fff',
              marginBottom: 5,
            }}
          >
            Level 11
          </Text>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 20,
              backgroundColor: '#EFF8FF',
              marginTop: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
              }}
            >
              <Ionicons name='trophy' size={20} color='#FDD92C' />
              <Text
                style={{
                  color: '#3F95F2',
                  fontFamily: 'poppins-bold',
                  fontSize: 16,
                }}
              >
                Rating: 1200
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
