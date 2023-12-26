import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';

export default function Challange() {
  const [width, setWidth] = React.useState(Dimensions.get('window').width);

  useEffect(() => {
    const onChange = () => {
      setWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  const renderOpponentCard = (player, index) => {
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
          flexDirection: index === 2 ? 'row-reverse' : 'row',
        }}
      >
        <View>
          <Text
            style={{
              color: '#69829c',
              fontSize: FontSize.md,
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              marginBottom: 10,
            }}
          >
            Playing from USA florida
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: Spacing.margin.xl,
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
        </View>

        <View
          style={{
            // display: 'none',

            borderWidth: 2,
            borderColor: '#67728f',
            backgroundColor: '#3a4761',
            position: 'absolute',
            left: index === 2 ? Spacing.margin.base : '',
            right: index !== 2 ? Spacing.margin.base : '',
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
              overflow: 'hidden',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: index === 2 && 0,
              right: index !== 2 && 0,
              color: '#fff',
              borderRadius: Spacing.borderRadius.sm,
              backgroundColor: '#1b173c',
              //   height: 60,
              //   width: 60,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingBottom: 8,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: FontSize.sm,
                fontFamily: 'sans-serif',
              }}
            >
              Lv
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: FontSize.base,
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
              }}
            >
              1
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: '100%', paddingHorizontal: width > 1300 ? 400 : 0 }}
    >
      <SafeAreaView
        style={{
          height: '100%',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <TouchableOpacity
          style={{
            zIndex: 100,
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
        </TouchableOpacity> */}

        <View
          style={{
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {renderOpponentCard(
            {
              preTag: 'playing from USA florida',
              playerName: 'Alex Johnson',
              country: 'us',
              subtext: 'Expert',
            },
            1,
          )}

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
          {renderOpponentCard(
            {
              preTag: 'playing from USA florida',
              playerName: 'Alex Johnson',
              country: 'us',
              subtext: 'Expert',
            },
            2,
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
