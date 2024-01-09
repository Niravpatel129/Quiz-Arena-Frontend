import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { newRequest } from '../../api/newRequest';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';

export default function LeaderboardsScreen({ navigation }) {
  const [leaderboards, setLeaderboards] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('tab1');

  const fetchLeaderboards = async () => {
    const response = await newRequest.get('/leaderboards');
    const data = response.data;
    data.sort((a, b) => b.averageRating - a.averageRating);
    const animatedData = data.map((player) => ({
      ...player,
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(50),
    }));
    setLeaderboards(animatedData);
  };

  React.useEffect(() => {
    fetchLeaderboards();
  }, []);

  React.useEffect(() => {
    const animateLeaderboards = () => {
      leaderboards.forEach((_, index) => {
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.parallel([
            Animated.timing(leaderboards[index].opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(leaderboards[index].translateY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    };

    if (leaderboards.length > 0) {
      animateLeaderboards();
    }
  }, [leaderboards]);

  const renderTopThree = ({ players }) => {
    return players.map((player, index) => {
      const color = index === 0 ? 'gold' : index === 1 ? 'silver' : '#CD7F32';

      return (
        <Animated.View
          key={index}
          style={{
            opacity: player.opacity,
            transform: [{ translateY: player.translateY }],
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {
                userId: player._id,
              })
            }
          >
            <Image
              style={{
                width: 90,
                height: 90,
                borderRadius: 75,
                borderWidth: 3,
                borderColor: color,
              }}
              source={{
                uri:
                  player.profile?.avatar ||
                  'https://upload.wikimedia.org/wikipedia/en/e/e0/Felicette%2C_spacecat.jpg',
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              textAlign: 'center',
              marginTop: 3,
              fontSize: 13,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Text style={{ color: color, maxWidth: 100 }}>
                #{index + 1} {capitalizeFirstLetter(player.username)}
              </Text>
              <CountryFlag isoCode={player?.profile?.country || 'ca'} size={12} />
            </View>
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 13,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            <Text style={{ color: color }}>{Math.floor(player.averageRating)}</Text>
          </Text>
        </Animated.View>
      );
    });
  };

  const renderLeaderboardsPlayers = ({ players }) => {
    return players.map((player, index) => {
      return (
        <Animated.View
          key={index}
          style={{
            backgroundColor: '#1c2141',
            marginHorizontal: 20,
            borderRadius: 22,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
            opacity: player.opacity,
            transform: [{ translateY: player.translateY }],
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 10,
                color: 'white',
              }}
            >
              {index + 4}.
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Profile', {
                  userId: player._id,
                })
              }
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{
                  uri:
                    player.profile?.avatar ||
                    'https://upload.wikimedia.org/wikipedia/en/e/e0/Felicette%2C_spacecat.jpg',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                  paddingLeft: 10,
                  maxWidth: 150,
                }}
              >
                {capitalizeFirstLetter(player.username || 'Anonymous')}
              </Text>
              <CountryFlag
                isoCode={player?.profile?.country || 'ca'}
                size={16}
                style={{ marginHorizontal: 5 }}
              />
            </View>
          </View>

          <Text
            style={{
              paddingRight: 12,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                flex: 1,
                width: '100%',
                fontWeight: 'bold',
              }}
            >
              {Math.floor(player.averageRating)}
            </Text>
          </Text>
        </Animated.View>
      );
    });
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ height: '100%' }}>
      <SafeAreaView
        style={{
          // backgroundColor: '#1c2141',
          height: '100%',
        }}
      >
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                backgroundColor: '#1c2141',
                margin: 10,
                borderRadius: 22,
              }}
            >
              <TouchableOpacity
                onPress={() => setActiveTab('tab1')}
                style={{
                  backgroundColor: activeTab === 'tab1' ? 'lightgray' : '#1c2141',
                  borderRadius: 22,
                  flex: 1,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: activeTab === 'tab1' ? '#1c2141' : '#ffffff',
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}
                >
                  Global
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab('tab2')}
                style={{
                  backgroundColor: activeTab === 'tab2' ? 'lightgray' : '#1c2141',
                  borderRadius: 22,
                  flex: 1,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: activeTab === 'tab2' ? '#1c2141' : '#ffffff',
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}
                >
                  Friends
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                  }}
                >
                  {/* Top 3 */}
                  {renderTopThree({ players: leaderboards.slice(0, 3) })}
                </View>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  {renderLeaderboardsPlayers({ players: leaderboards.slice(3) })}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
