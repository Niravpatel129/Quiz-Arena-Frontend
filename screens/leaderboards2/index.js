import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Animated,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { newRequest } from '../../api/newRequest';
import LeaderboardsList from './components/LeaderboardsList';
import TopThree from './components/TopThree';

export default function Leaderboards2() {
  const [selectedTab, setSelectedTab] = React.useState('Global');
  const [leaderboardsData, setLeaderboardsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      const response = await newRequest.get('/leaderboards');
      const data = response.data;
      data.sort((a, b) => b.averageRating - a.averageRating);
      const animatedData = data.map((player) => ({
        ...player,
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(50),
      }));
      setLeaderboardsData(animatedData);
      setLoading(false);
    };

    fetchLeaderboards();
  }, []);

  React.useEffect(() => {
    const animateLeaderboards = () => {
      leaderboardsData.forEach((_, index) => {
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.parallel([
            Animated.timing(leaderboardsData[index].opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(leaderboardsData[index].translateY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    };

    if (leaderboardsData.length > 0) {
      animateLeaderboards();
    }
  }, [leaderboardsData]);

  const renderButtons = () => {
    const renderSingleButton = (text, selected) => {
      const textColor = selected ? '#FFFFFF' : '#5E6064';
      const buttonStyle = {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: selected ? 0 : 1,
        borderColor: selected ? 'none' : '#DCEDFD',
        shadowColor: selected ? '#206DD8' : 'transparent',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: selected ? 1.0 : 0,
        shadowRadius: selected ? 3 : 0,
        elevation: selected ? 4 : 0,
      };

      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(text);
          }}
          style={{
            flex: 1,
          }}
        >
          {selected ? (
            <LinearGradient
              colors={['#84BDFA', '#3F95F2']}
              start={[0.0, 0.0]}
              end={[1.0, 1.0]}
              style={buttonStyle}
            >
              <Text
                style={{
                  color: textColor,
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'poppins-regular',
                }}
              >
                {text}
              </Text>
            </LinearGradient>
          ) : (
            <View style={buttonStyle}>
              <Text
                style={{
                  color: textColor,
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'poppins-regular',
                }}
              >
                {text}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
        }}
      >
        {renderSingleButton('Global', selectedTab === 'Global')}
        {renderSingleButton('Friends', selectedTab === 'Friends')}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#DCEDFD', '#FFFFFF']}
      style={{
        flex: 1,
        paddingHorizontal: 12,
      }}
    >
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              {renderButtons()}
            </View>
            <View
              style={{
                marginTop: 50,
              }}
            >
              {loading && (
                <ActivityIndicator size='large' color='#3d6bc6' style={{ marginTop: 20 }} />
              )}

              <TopThree data={leaderboardsData.slice(0, 3)} />
            </View>
            <View>
              <LeaderboardsList data={leaderboardsData.slice(3)} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
