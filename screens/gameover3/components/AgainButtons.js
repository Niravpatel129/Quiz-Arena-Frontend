import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useTracking } from '../../../context/tracking/TrackingContext';

let TestIds = {
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
};

let useInterstitialAd = () => {
  return {
    isLoaded: true,
    isClosed: false,
    load: () => {},
    show: () => {},
  };
};

const androidORIOSAdUnitId =
  Platform.OS === 'ios'
    ? 'ca-app-pub-7342852291876571/2789459022'
    : 'ca-app-pub-7342852291876571/7954155798';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : androidORIOSAdUnitId;
export default function AgainButtons({ opponentId, categoryName, handleRematch }) {
  const navigation = useNavigation();
  const { trackingStatus } = useTracking();
  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: !trackingStatus || true,
  });
  const [nextScreen, setNextScreen] = React.useState({
    name: 'Categories',
    config: {},
  });

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      navigation.navigate(nextScreen.name, nextScreen.config);
    }
  }, [isClosed, navigation]);

  const ShowAdBeforeNavigation = async (navigationTo, options = {}) => {
    try {
      let gameCount = await AsyncStorage.getItem('gameCount');
      gameCount = gameCount ? parseInt(gameCount) + 1 : 1;
      await AsyncStorage.setItem('gameCount', gameCount.toString());

      if (gameCount % 3 === 0) {
        console.log('Showing an ad :(');
        if (isLoaded) {
          setNextScreen({ name: navigationTo, config: options });
          show();
        } else {
          navigation.navigate(navigationTo, options);
        }
      } else {
        navigation.navigate(navigationTo, options);
      }
    } catch (err) {
      console.log('Error in ShowAdBeforeNavigation:', err);
      navigation.navigate(navigationTo, options);
    }
  };

  const HomeButton = () => {
    return (
      <TouchableOpacity
        onPress={async () => {
          setNextScreen({ name: 'Categories', config: {} });
          await ShowAdBeforeNavigation('Categories');
        }}
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
          paddingVertical: 12,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 50,
          borderWidth: 1,
          borderColor: '#CFCFCF',
        }}
      >
        <Ionicons name='home' size={24} color='#E15393' />
      </TouchableOpacity>
    );
  };

  const ChatButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat', {
            chattingWithId: opponentId,
          });
        }}
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
          paddingVertical: 12,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 50,
          borderWidth: 1,
          borderColor: '#CFCFCF',
        }}
      >
        <Ionicons name='chatbox' size={24} color='#E15393' />
      </TouchableOpacity>
    );
  };

  const RematchButton = () => {
    return (
      <TouchableOpacity
        onPress={handleRematch}
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
          flexDirection: 'row',
          gap: 5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: '#E15393',
        }}
      >
        <Ionicons name='refresh-outline' size={24} color='white' />
        <Text
          style={{
            fontFamily: 'poppins-semiBold',
            color: 'white',
          }}
        >
          Rematch
        </Text>
      </TouchableOpacity>
    );
  };

  const playAgainButton = () => {
    return (
      <TouchableOpacity
        onPress={async () => {
          setNextScreen({
            name: 'Queue',
            config: { categoryId: categoryName.split(' ').join('-'), categoryName: categoryName },
          });

          await ShowAdBeforeNavigation('Queue', {
            categoryId: categoryName.split(' ').join('-'),
            categoryName: categoryName,
          });
        }}
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
          flexDirection: 'row',
          gap: 5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: '#3F95F2',
        }}
      >
        <Ionicons name='play' size={24} color='white' />
        <Text
          style={{
            fontFamily: 'poppins-semiBold',
            color: 'white',
          }}
        >
          Play Again
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CFCFCF',
        }}
      ></View>
      <View
        style={{
          paddingVertical: 20,
          flexDirection: 'row',
          gap: 5,
          width: '100%',
        }}
      >
        <View>{HomeButton()}</View>
        <View>{ChatButton()}</View>
        <View
          style={{
            flex: 2,
          }}
        >
          {RematchButton()}
        </View>
        <View
          style={{
            flex: 2,
          }}
        >
          {playAgainButton()}
        </View>
      </View>
    </View>
  );
}
