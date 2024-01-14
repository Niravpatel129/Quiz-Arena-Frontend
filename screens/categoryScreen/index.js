import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { newRequest } from '../../api/newRequest';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';

export default function CategoryScreen({ route }) {
  const [activeTab, setActiveTab] = React.useState('tab1');
  const navgiation = useNavigation();
  const [topPlayers, setTopPlayers] = React.useState([]);
  const [topContributors, setTopContributors] = React.useState([]);

  const categoryName = route.params?.categoryName;
  const parentCategory = route.params?.parentCategory;
  const categoryImage = route.params?.categoryImage;
  const categoryId = route.params?.categoryId;

  useEffect(() => {
    const fetchTopPlayers = async () => {
      const response = await newRequest(`/leaderboards/${categoryName}`);
      const animatedPlayers = response.data.map((player) => ({
        ...player,
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(50),
      }));
      setTopPlayers(animatedPlayers);

      animatedPlayers.forEach((_, index) => {
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.parallel([
            Animated.timing(animatedPlayers[index].opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(animatedPlayers[index].translateY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    };

    fetchTopPlayers();
  }, []);

  const renderLeaderboardsPlayers = ({ players }) => {
    return players.map((player, index) => {
      return (
        <Animated.View
          key={index}
          style={{
            backgroundColor: '#1c2141',
            marginHorizontal: 16,
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
                fontSize: 22,
                fontWeight: 'bold',
                marginRight: 12,
                color: 'white',
              }}
            >
              {index + 1}.
            </Text>
            <TouchableOpacity
              onPress={() =>
                navgiation.navigate('PublicProfile', {
                  userId: player._id,
                })
              }
            >
              <Image
                style={{ width: 40, height: 40, borderRadius: 25 }}
                source={{
                  uri:
                    player?.avatar ||
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
                  paddingLeft: 7,
                  maxWidth: 150,
                }}
              >
                {capitalizeFirstLetter(player.username || 'Anonymous')}
              </Text>
              <CountryFlag
                isoCode={player?.country || 'ca'}
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
              {Math.floor(player.rating || 1200)}
            </Text>
          </Text>
        </Animated.View>
      );
    });
  };

  const renderTopContributors = ({ contributors }) => {
    return (
      <Animated.View
        style={{
          backgroundColor: '#1c2141',
          marginHorizontal: 16,
          borderRadius: 22,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          // opacity: player.opacity,
          // transform: [{ translateY: player.translateY }],
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
              fontSize: 22,
              fontWeight: 'bold',
              marginRight: 12,
              color: 'white',
            }}
          >
            1.
          </Text>
          <TouchableOpacity
            onPress={() =>
              navgiation.navigate('PublicProfile', {
                userId: player._id,
              })
            }
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 25 }}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Felicette%2C_spacecat.jpg',
                headers: {
                  Accept: '*/*',
                },
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
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                paddingLeft: 7,
                maxWidth: 150,
              }}
            >
              {capitalizeFirstLetter('Admin')}
            </Text>
            <CountryFlag isoCode={'us'} size={16} style={{ marginHorizontal: 5 }} />
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
              fontSize: 13,
              flex: 1,
              width: '100%',
              fontWeight: 'bold',
            }}
          >
            31,544 Questions
          </Text>
        </Text>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={{ height: '100%', width: '100%' }}
    >
      <SafeAreaView
        style={{
          width: '100%',
        }}
      >
        <ScrollView
          style={{
            width: '100%',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Text
              style={{
                marginTop: 50,
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 20,
              }}
            >
              {capitalizeFirstLetter(categoryName) || 'League of Legends'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 2,
              }}
            >
              <View>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      categoryImage ||
                      'https://cdn.vox-cdn.com/thumbor/UehyoNzYoIR5ZJDrvHjDAZhmkaI=/0x0:1920x1080/1400x933/filters:focal(1030x331:1336x637):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/65632309/jbareham_191158_ply0958_decade_lolengends.0.jpg',
                  }}
                />
              </View>
              {/* Buttons */}
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navgiation.navigate('Queue', {
                      categoryId: categoryId,
                      categoryName: categoryName,
                    })
                  }
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 10,
                    margin: 10,
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      fontFamily: 'Inter-Bold',
                    }}
                  >
                    Play
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navgiation.navigate('Friends');
                  }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 10,
                    margin: 10,
                    fontWeight: 'bold',
                    fontFamily: 'Inter-Bold',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      fontFamily: 'Inter-Bold',
                    }}
                  >
                    Invite
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navgiation.navigate('Contribute', {
                      category: categoryName,
                      parentCategory: parentCategory,
                    });
                  }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 10,
                    margin: 10,
                    fontWeight: 'bold',
                    fontFamily: 'Inter-Bold',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      fontFamily: 'Inter-Bold',
                    }}
                  >
                    Contribute
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Leaderboards */}
            <View>
              {/* Tabs */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 10,
                  backgroundColor: '#1d284b',
                  margin: 10,
                  borderRadius: 22,
                  width: '90%',
                  gap: 7,
                }}
              >
                <TouchableOpacity
                  onPress={() => setActiveTab('tab1')}
                  style={{
                    backgroundColor: activeTab === 'tab1' ? '#fff' : '#1c2141',
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
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    Top Players
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveTab('tab2')}
                  style={{
                    backgroundColor: activeTab === 'tab2' ? '#fff' : '#1c2141',
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
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    Top Contributors
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Players */}
              {activeTab === 'tab1' && (
                <View>
                  {renderLeaderboardsPlayers({
                    players: topPlayers,
                  })}
                </View>
              )}
              {activeTab === 'tab2' && (
                <View>
                  {renderTopContributors({
                    contributors: topContributors,
                  })}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
