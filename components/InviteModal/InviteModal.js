import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import socketService from '../../services/socketService';

export default function InviteModal({ category, isModalVisible, hideModal }) {
  const [gameRoomId, setGameRoomId] = useState('');

  useEffect(() => {
    const generateGameRoomId = async () => {
      const roomId = Math.floor(Math.random() * 100000);

      socketService.emit('joinChallengeQueue', {
        gameId: roomId,
        category: category,
        newGame: true,
      });

      setGameRoomId(roomId);
    };

    generateGameRoomId();

    // On
    socketService.on('game_start', (data) => {
      if (!data) {
        alert('Game failed to start due to an error.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Categories' }],
        });

        return null;
      }

      // vibrate phone
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      navigation.navigate('Game', { game: data.game });
    });

    return () => {
      socketService.emit('leaveChallengeQueue', {
        gameId: gameRoomId,
        category: category,
      });
    };
  }, []);

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
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              marginTop: 20,
              marginBottom: 20,
            }}
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
            Waiting for opponent to join...
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
                https://quizarena.gg/invite/{gameRoomId}
              </Text>
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
              onPress={() => {}}
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
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
