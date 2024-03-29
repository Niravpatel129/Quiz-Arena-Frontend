import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';

import socketService from '../../services/socketService';

export default function InviteModal({ category, isModalVisible, hideModal }) {
  const [gameRoomId, setGameRoomId] = useState(null);
  const [showCopied, setShowCopied] = useState(false);
  const navigation = useNavigation();
  const [loadingText, setLoadingText] = useState('Waiting for opponent to join');
  const rotation = useSharedValue(0);
  const [navigateToChallenge, setNavigateToChallenge] = useState(false);

  const spin = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    // Start the spinning animation
    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1, false);
  }, []);

  useEffect(() => {
    setGameRoomId(Math.floor(Math.random() * 100000));
  }, [isModalVisible]);

  useEffect(() => {
    if (!showCopied) return;
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  }, [showCopied]);

  useEffect(() => {
    if (!gameRoomId) return;

    const generateGameRoomId = async () => {
      console.log('joining challenge queue');
      console.log('🚀  gameRoomId:', gameRoomId);

      socketService.emit('joinChallengeQueue', {
        gameId: gameRoomId,
        category: category,
        newGame: true,
      });
    };

    generateGameRoomId();

    // On

    socketService.on('game_start', async (data) => {
      if (!isModalVisible) return;

      hideModal();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (navigateToChallenge) return;

      setNavigateToChallenge(true);

      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Game',
            params: { game: data.game, gameSessionId: data.gameSessionId, players: data.players },
          },
        ],
      });
    });

    return () => {
      socketService.off('game_start');

      socketService.emit('leaveChallengeQueue', {
        gameId: gameRoomId,
        category: category,
      });
    };
  }, [gameRoomId]);

  return (
    <Modal
      style={{}}
      animationType='slide'
      visible={isModalVisible}
      onRequestClose={hideModal}
      presentationStyle='formSheet'
    >
      <SafeAreaView
        style={{
          backgroundColor: '#1d284b',
          height: '100%',
        }}
      >
        <View
          style={{
            marginTop: 22,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              hideModal();
            }}
            style={{
              position: 'absolute',
              right: 10,
            }}
          >
            <Ionicons name='ios-close' size={40} color='#fff' />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 10,
              marginLeft: 10,
              marginTop: 100,
              textAlign: 'left',
              fontWeight: 'bold',
              fontFamily: 'Inter-Black',
              color: '#fff',
              fontSize: RFValue(20),
              letterSpacing: 2.5,
            }}
          >
            Quick Invite
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: RFValue(10),
              fontWeight: 'bold',
              fontFamily: 'Inter-Black',
              // letterSpacing: 2.5,
            }}
          >
            {capitalizeFirstLetter(category)}
          </Text>
          <Animated.Image
            style={[
              {
                width: 200,
                height: 200,
                borderRadius: 100,
                marginTop: 20,
                marginBottom: 20,
              },
              spin,
            ]}
            source={{
              uri: 'https://cdn.dribbble.com/users/113499/screenshots/7146093/space-cat.png',
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: RFValue(16),
              fontWeight: 'bold',
              fontFamily: 'Inter-Black',
              // letterSpacing: 2.5,
            }}
          >
            {loadingText}
          </Text>
          {/* <Text
            style={{
              color: '#fff',
              fontSize: RFValue(16),
              fontWeight: 'bold',
              fontFamily: 'Inter-Black',
              marginTop: 40,
              // letterSpacing: 2.5,
            }}
          >
            Category: {capitalizeFirstLetter(category)}
          </Text> */}

          <View
            style={{
              width: '90%',
              // backgroundColor: '1c2141',
            }}
          >
            <View>
              <TouchableOpacity
                onPress={async () => {
                  await Clipboard.setStringAsync(`https://quizarena.gg/invite?id=${gameRoomId}`);
                  setShowCopied(true);
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(13),
                    fontWeight: 700,
                    marginBottom: 10,
                    // marginLeft: 10,
                    marginTop: 60,
                    textAlign: 'left',
                    backgroundColor: '#1c2141',
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    // width: '100%',
                    // width: 200,
                    textAlign: 'center',
                    color: 'gray',
                    opacity: 0.9,
                    marginBottom: 10,
                  }}
                >
                  https://quizarena.gg/invite?id={gameRoomId}
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  color: '#fff',
                  fontSize: RFValue(10),
                  fontFamily: 'Inter-Bold',
                  textAlign: 'center',
                  // marginTop: 10,
                }}
              >
                Send this link to anyone on Android or iOS
              </Text>
            </View>
            <TouchableOpacity
              style={{
                padding: 10,
                // backgroundColor: '#1c2141',
                borderRadius: 10,
                // width: 200,
                // width: '100%',
                alignItems: 'center',
                marginTop: 60,
                paddingVertical: 20,
              }}
              onPress={async () => {
                // Clipboard.setString(`https://quizarena.gg/invite/${gameRoomId}`);
                await Clipboard.setStringAsync(`https://quizarena.gg/invite?id=${gameRoomId}`);
                setShowCopied(true);
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                <Text
                  style={{
                    marginRight: 10,
                  }}
                >
                  Copy Link{' '}
                </Text>
                <Ionicons
                  name='copy-outline'
                  style={{
                    marginLeft: 10,
                  }}
                  size={24}
                  color='#fff'
                />
              </Text>
            </TouchableOpacity>
            <Text>
              {showCopied ? (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: RFValue(10),
                    fontFamily: 'Inter-Bold',
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  Copied to clipboard!
                </Text>
              ) : null}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
