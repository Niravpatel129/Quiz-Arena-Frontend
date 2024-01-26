import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { RFValue } from 'react-native-responsive-fontsize';

export default function PreGame({ myData, opponentData }) {
  const renderPlayerCard = (userData, isOpponent) => {
    return (
      <View
        style={{
          flexDirection: isOpponent ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: '#3F95F2',
          borderRadius: 20,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'poppins-bold',
                fontSize: RFValue(18),
                textTransform: 'capitalize',
              }}
            >
              {userData?.name || ''}
            </Text>
            {userData?.playerInformation?.country && (
              <CountryFlag isoCode={userData?.playerInformation?.country} size={14} />
            )}
          </View>

          <View
            style={{
              width: 170,
              padding: 5,
              backgroundColor: 'white',
              //   paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 30,
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              //   justifyContent: 'center',
              paddingLeft: 10,
              marginTop: 10,
            }}
          >
            <Ionicons name='trophy-outline' size={20} color='#FDD92C' />
            <Text
              style={{
                color: '#3F95F2',
                fontFamily: 'poppins-semiBold',
                fontWeight: 'bold',
                fontSize: RFValue(12),
              }}
            >
              Rating: {userData?.playerInformation?.elo?.rating}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri:
                userData?.playerInformation?.avatar ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM6A1erx9khLr3mjq5FxsfMqW6vf5b8lvlmcqG88p-w&s',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#EC80B4', '#3F95F2']}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 20,
            marginVertical: 120,
            borderRadius: 25,
            justifyContent: 'space-between',
          }}
        >
          {renderPlayerCard(myData, false)}
          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <Image
              source={require('../../assets/vs_icon.png')}
              style={{ width: 100, height: 100 }}
            />
            <Text
              style={{
                color: '#5E6064',
                fontFamily: 'poppins-regular',
                fontSize: RFValue(14),
                marginTop: 5,
              }}
            >
              Preparing stage for battle...
            </Text>
          </View>
          <View>{renderPlayerCard(opponentData, true)}</View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
