import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QueueScreen2() {
  const navigation = useNavigation();

  const renderPlayerCard = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 30,
          paddingHorizontal: 10,
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
                fontSize: RFValue(19),
              }}
            >
              Alex Smith
            </Text>
            <CountryFlag isoCode='us' size={14} />
          </View>

          <View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginTop: 5,
              }}
            >
              1179 Rating
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM6A1erx9khLr3mjq5FxsfMqW6vf5b8lvlmcqG88p-w&s',
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

  const renderSearchingCard = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 30,
          paddingHorizontal: 10,
          backgroundColor: '#EC80B4',
          borderRadius: 20,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: '#FBE8F2',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name='search' size={50} color='#EC80B4' />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',

              gap: 5,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'poppins-bold',
                fontSize: RFValue(19),
                maxWidth: 160,
              }}
            >
              Searching Opponent ....
            </Text>
          </View>
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 40,
            left: 20,
            padding: 5,
          }}
        >
          <Ionicons name='arrow-back' size={34} color='white' />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 20,
            marginVertical: 20,
            borderRadius: 25,
          }}
        >
          {renderPlayerCard()}
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
          </View>
          <View>{renderSearchingCard()}</View>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: RFValue(12),
                fontFamily: 'poppins-regular',
                marginTop: 'auto',
              }}
            >
              In Queue for
            </Text>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: RFValue(12),
                marginVertical: 3,
                fontFamily: 'poppins-bold',
              }}
            >
              League Of Legends
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Image
              source={require('../../assets/hour_glass.png')}
              style={{ width: 50, height: 50 }}
            />
            <Text
              style={{
                fontSize: RFValue(12),
                fontWeight: 'bold',
                fontFamily: 'poppins-bold',
                marginTop: 3,
                color: '#5E6064',
              }}
            >
              Time In Queue:{' '}
              <Text
                style={{
                  fontFamily: 'poppins-bold',
                  color: '#3F95F2',
                }}
              >
                00:00:00
              </Text>
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              color: '#5E6064',
              fontFamily: 'poppins-regular',
              marginTop: 5,
            }}
          >
            <Text>Estimated Wait Time: 00:02:03</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
