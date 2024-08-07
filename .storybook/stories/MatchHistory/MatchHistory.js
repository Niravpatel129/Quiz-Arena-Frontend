import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { newRequest } from '../../../api/newRequest';
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter';

export default function MatchHistory() {
  const navigation = useNavigation();
  const [matchHistory, setMatchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getMatchHistory = async () => {
      const res = await newRequest.get('/matchHistory');
      setUserId(res.data.userId);

      const animatedMatchHistory = res.data.matchHistory.map((item) => ({
        ...item,
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(50),
      }));
      setMatchHistory(animatedMatchHistory);
      setIsLoading(false);

      animatedMatchHistory.forEach((_, index) => {
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.parallel([
            Animated.timing(animatedMatchHistory[index].opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(animatedMatchHistory[index].translateY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    };

    getMatchHistory();
  }, []);

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const parseSubtitle = ({ opponentName, date }) => {
    return (
      <>
        You faced {capitalizeFirstLetter(opponentName)} {formatDate(date)}!
      </>
    );
  };

  const FlatListRender = ({ item, index }) => {
    if (!item) return null;

    const opponent = item?.players?.find((v) => {
      return v?.id !== userId;
    });
    const result = item.winnerId === userId ? 'Won' : 'Lost';
    const opponentAvatar = opponent?.playerInformation?.avatar;
    if (!opponent) return null;

    return (
      <Animated.View
        key={item.id}
        style={[
          styles.bubble,
          {
            marginBottom: 10,
            opacity: matchHistory[index]?.opacity,
            transform: [{ translateY: matchHistory[index]?.translateY }],
          },
        ]}
      >
        <View style={styles.bubbleIcon}>
          <Ionicons
            style={{
              marginTop: 13,
            }}
            name='ios-trophy'
            size={40}
            color={result === 'Won' ? '#53d769' : '#fc3158'}
          />
        </View>
        <View style={styles.bubbleInnerContainer}>
          <Text style={styles.bubbleTitle}>{capitalizeFirstLetter(item?.category)}</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('MatchHistoryDetails', {
                matchId: item.id,
              });
            }}
          >
            <Text style={styles.bubbleSubtitle}>
              {parseSubtitle({
                opponentName: opponent?.name,
                date: item?.startTime,
              })}
            </Text>
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PublicProfile', {
              userId: opponent?.id,
            });
          }}
        >
          <Image
            cachePolicy='memory-disk'
            source={{
              uri:
                opponentAvatar ||
                'https://cdn.dribbble.com/users/113499/screenshots/7146093/space-cat.png',
            }}
            alt=''
            size='xs'
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              marginRight: 15,
              marginTop: 5,
              borderWidth: 2,
              borderColor: '#516696',
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ height: '100%' }}>
      <SafeAreaView>
        <View style={styles.container}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size='large' color='#516696' />
            </View>
          )}

          {matchHistory.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <Text
                  style={{
                    fontFamily: 'Inter-Black',
                    color: '#fff',
                    fontSize: 30,
                    marginBottom: 25,
                    textAlign: 'center',
                    paddingTop: 28,
                  }}
                >
                  Match History
                </Text>
              )}
              // ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
              data={matchHistory}
              renderItem={FlatListRender}
              keyExtractor={(item) => item._id}
            />
          )}

          {matchHistory.length === 0 && !isLoading && (
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Black',
                  color: '#fff',
                  fontSize: 25,
                  marginTop: 25,
                  textAlign: 'center',
                  paddingTop: 28,
                }}
              >
                No match history yet!
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 20,
    // paddingTop: 20,
    // backgroundColor: '#1c2141',
  },
  bubble: {
    flexDirection: 'row',
    backgroundColor: '#1c2141',
    // backgroundColor: 'rgba(48, 62, 95, 0.37)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#516696',
    paddingLeft: 13,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  bubbleIcon: {
    color: '#fff',
    marginTop: 3,
    marginRight: 10,
  },
  bubbleTitle: {
    fontWeight: 600,
    color: '#fff',
    fontSize: 16,
    maxWidth: 200,
  },
  bubbleSubtitle: {
    fontSize: 13,
    fontWeight: 400,
    color: '#fff',
    maxWidth: 200,
  },
  bubbleInnerContainer: {
    marginRight: 10,
    marginTop: 7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1c2141',
  },
});
