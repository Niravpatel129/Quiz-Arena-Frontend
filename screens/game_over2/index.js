import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EndGameChart from '../../components/EndGameChart';
import RematchModal from '../../components/RematchModal/RematchModal';
import Scoresheet from '../../components/Scoresheet/Scoresheet';
import socketService from '../../services/socketService';

const fakeData2 = {
  gameSessionId: '1',
  yourData: {
    id: '1',
    username: 'Bob',
    rating: 1400,
    ratingChange: 30,
    result: 'winner',

    avatar:
      'https://t4.ftcdn.net/jpg/01/62/72/29/360_F_162722972_3SlhxozZGdL3rGuWgKyVP2NTs8POtX2n.jpg',
    gameData: {
      scores: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    },
  },
  opponentData: {
    id: '2',
    username: 'Zezima',
    result: 'loser',
    rating: 1400,
    ratingChange: -30,
    avatar:
      'https://t4.ftcdn.net/jpg/01/62/72/29/360_F_162722972_3SlhxozZGdL3rGuWgKyVP2NTs8POtX2n.jpg',
    gameData: {
      scores: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    },
  },
};

export default function GameOver2({ navigation, route }) {
  const [rematchModalVisible, setRematchModalVisible] = React.useState(false);
  const fakeData = route.params?.results || fakeData2;

  if (!fakeData) return null;

  const handleRematch = () => {
    socketService.socket.emit('rematch', fakeData.gameSessionId);
  };

  useEffect(() => {
    socketService.socket.on('rematch', (gameSessionId) => {
      // show rematch modal

      setRematchModalVisible(true);
    });
  }, []);

  const playerCard = (playerInfo) => {
    console.log('🚀  playerInfo:', playerInfo);
    return (
      <View>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: playerInfo.result === 'winner' ? '#00c03d' : '#ff0000',
          }}
          source={{
            uri: playerInfo.avatar,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 3,
            color: '#fff',
            fontFamily: 'Inter-Black',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          {playerInfo.username}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 3,
            color: '#fff',
            fontFamily: 'Inter-Black',
            fontWeight: 'bold',
            fontSize: 12,
            flexDirection: 'row',
            gap: 2,
          }}
        >
          {playerInfo.rating || 1200}

          <Text
            style={{
              color: playerInfo.ratingChange > 0 ? '#00c03d' : '#ff0000',
              fontWeight: 'bold',
              fontFamily: 'Inter-Black',
            }}
          >
            {playerInfo.ratingChange > 0 ? '+' : ''}({playerInfo.ratingChange})
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        height: '100%',
      }}
    >
      <SafeAreaView>
        <RematchModal visible={rematchModalVisible} />
        <ScrollView
          style={{
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 100,
              right: 10,
            }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Categories' }],
              });
            }}
          >
            <Ionicons name='ios-close' size={40} color='#fff' />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 40,
                color: fakeData.yourData.result === 'winner' ? '#00c03d' : '#ff0000',
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: 'Inter-Black',
              }}
            >
              {fakeData.yourData.result === 'winner' ? 'Victory' : 'Defeat'}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 50,
              marginBottom: 30,
              justifyContent: 'space-evenly',
            }}
          >
            <View>{playerCard(fakeData.yourData)}</View>
            <View>{playerCard(fakeData.opponentData)}</View>
          </View>

          <Scoresheet
            playerOneData={{
              username: fakeData.yourData.username,
              scores: fakeData.yourData.gameData.scores,
            }}
            playerTwoData={{
              username: fakeData.opponentData.username,
              scores: fakeData.opponentData.gameData.scores,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
              gap: 10,
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#32547A6B',
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#667EB7',
                padding: 15,
              }}
            >
              <Ionicons name='ios-share-outline' size={22} color='#fff' />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#32547A6B',
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#667EB7',
                padding: 15,
                flex: 1,
              }}
              onPress={() => {
                handleRematch();
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Inter-Black',
                    fontSize: 18,
                    textAlign: 'center',
                  }}
                >
                  Rematch
                </Text>
                <Ionicons
                  style={{
                    paddingLeft: 10,
                  }}
                  name='ios-refresh-outline'
                  size={24}
                  color='#fff'
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#32547A6B',
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#667EB7',
                padding: 15,
              }}
            >
              <Ionicons name='ios-chatbox' size={22} color='#fff' />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Categories' }],
              });
            }}
            style={{
              backgroundColor: '#32547A6B',
              borderWidth: 2,
              borderRadius: 15,
              borderColor: '#667EB7',
              padding: 15,
              flex: 1,
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Inter-Black',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                Play Again
              </Text>
              <Ionicons
                style={{
                  paddingLeft: 10,
                }}
                name='ios-play'
                size={24}
                color='#fff'
              />
            </View>
          </TouchableOpacity>
          <View>
            <EndGameChart
              chartData={{
                playerOne: {
                  name: fakeData.yourData.username,
                  scores: fakeData.yourData.gameData.scores.map((score) => score.points),
                },
                playerTwo: {
                  name: fakeData.opponentData.username,
                  scores: fakeData.opponentData.gameData.scores.map((score) => score.points),
                },
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
