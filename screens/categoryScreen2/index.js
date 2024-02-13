import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { newRequest } from '../../api/newRequest';
import InviteModal from '../../components/InviteModal/InviteModal';
import LeaderboardsList from './components/LeaderboardsList';
import getParentCategoryIcon from './getParentCategoryIcon';

export default function CategoryScreen2({ route }) {
  const navigation = useNavigation();
  const category = route.params?.categoryName;
  const categoryId = route.params?.categoryId;
  const categoryParent = route.params?.parentCategory;
  const [selectedTab, setSelectedTab] = React.useState('Top Players');
  const [leaderboardData, setLeaderboardData] = React.useState([]);
  const [isModalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      const response = await newRequest(`/leaderboards/${category}`);
      const animatedPlayers = response.data.map((player) => ({
        ...player,
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(50),
      }));

      setLeaderboardData(animatedPlayers);

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

  const renderButton = ({ onPress, text }) => {
    return (
      <TouchableOpacity style={{}} onPress={onPress}>
        <LinearGradient
          colors={['#EC80B4', '#3F95F2']}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{
            borderRadius: 25,
            shadowOffset: { width: 1, height: 1 },
            shadowColor: '#6F7CC8',
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 5,
            minWidth: 180,
            padding: 10,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              fontStyle: 'normal',
              textAlign: 'center',
              color: '#FFFFFF',
              fontFamily: 'poppins-bold',
            }}
          >
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderTabs = () => {
    const renderTabButton = ({ isSelected, text, onPress }) => {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 25,
            backgroundColor: isSelected ? '#EFF8FF' : '#ffffff',
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: isSelected ? 'poppins-semiBold' : 'poppins-regular',
              fontSize: RFValue(12),
              color: isSelected ? '#3F95F2' : '#000000',
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: 25,
          paddingVertical: 10,
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        {renderTabButton({
          isSelected: selectedTab === 'Top Players',
          text: 'Top Players',
          onPress: () => setSelectedTab('Top Players'),
        })}
        {renderTabButton({
          isSelected: selectedTab === 'Top Contributers',
          text: 'Top Contributers',
          onPress: () => setSelectedTab('Top Contributers'),
        })}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#e5e5e5']}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView>
        <ScrollView>
          <InviteModal
            category={category}
            isModalVisible={isModalVisible}
            hideModal={() => {
              if (!isModalVisible) return;

              setModalVisible(false);
            }}
          />
          <View
            style={{
              height: '100%',
              padding: 10,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: '100%',
                marginTop: 10,
                paddingTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons name='ios-arrow-back' size={24} color='black' />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: '600',
                  fontStyle: 'normal',
                  textAlign: 'center',
                  color: '#000000',
                  fontFamily: 'poppins-semiBold',
                }}
              >
                Play
              </Text>
              <View
                style={{
                  width: 24,
                }}
              ></View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <Pressable
                onLongPress={() => {
                  navigation.navigate('Solo', {
                    categoryId: categoryId,
                    categoryName: category,
                  });
                }}
              >
                <LinearGradient
                  colors={['#FF8F3B', '#FF4646']}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={{
                    width: 192,
                    height: 188,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: '#6F7CC8',
                    shadowOpacity: 0.5,
                    shadowRadius: 8,
                    elevation: 5,
                    padding: 10,
                  }}
                >
                  <Ionicons
                    name={getParentCategoryIcon(categoryParent)}
                    size={100}
                    color='white'
                    style={{
                      transform: [{ rotate: '-5deg' }],
                    }}
                  />
                  <Text
                    style={{
                      fontSize: category.length > 20 ? RFValue(12) : RFValue(15),
                      fontWeight: '600',
                      lineHeight: 22,
                      fontStyle: 'normal',
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontFamily: 'poppins-bold',
                      marginTop: -10,
                      textTransform: 'capitalize',
                    }}
                  >
                    {category}
                  </Text>
                </LinearGradient>
              </Pressable>

              {/* Buttons Container*/}
              <View
                style={{
                  justifyContent: 'space-between',
                }}
              >
                {renderButton({
                  onPress: () =>
                    navigation.navigate('Queue', {
                      categoryId: categoryId,
                      categoryName: category,
                    }),
                  text: 'Play',
                })}
                {renderButton({
                  onPress: () => {
                    if (isModalVisible) return;

                    setModalVisible(true);
                  },
                  text: 'Invite',
                })}
                {renderButton({
                  onPress: () => navigation.navigate('Contribute'),
                  text: 'Contribute',
                })}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 40,
                marginVertical: 15,
              }}
            >
              {renderTabs()}
            </View>
            <View
              style={{
                width: '100%',
              }}
            >
              {leaderboardData && selectedTab === 'Top Players' && (
                <LeaderboardsList data={leaderboardData} />
              )}
            </View>

            {selectedTab === 'Top Contributers' && (
              <View
                style={{
                  width: '100%',
                }}
              >
                <LeaderboardsList
                  data={[
                    {
                      placement: 1,
                      username: 'Admin',
                      country: 'us',
                      rating: 1321,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
