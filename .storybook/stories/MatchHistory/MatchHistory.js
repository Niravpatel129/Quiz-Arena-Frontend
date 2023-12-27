import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { Image, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Pressable, StyleSheet } from 'react-native';
import { newRequest } from '../../../api/newRequest';
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter';

export default function MatchHistory() {
  const navigation = useNavigation();
  const [matchHistory, setMatchHistory] = useState([]);

  useEffect(() => {
    const getMatchHistory = async () => {
      const res = await newRequest.get('/matchHistory');
      const animatedMatchHistory = res.data.matchHistory.map((item) => ({
        ...item,
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(50),
      }));
      setMatchHistory(animatedMatchHistory);

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

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
      style={styles.container}
      data={matchHistory}
      renderItem={({ item, index }) => {
        const opponent = item.players.find((v) => v.id !== item.userId);

        return (
          <Animated.View
            key={item.id}
            style={[
              styles.bubble,
              {
                opacity: matchHistory[index].opacity,
                transform: [{ translateY: matchHistory[index].translateY }],
              },
            ]}
          >
            <View style={styles.bubbleIcon}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170688.png',
                }}
                alt='Alternate Text'
                size='xs'
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={styles.bubbleInnerContainer}>
              <Text style={styles.bubbleTitle}>{item.category}</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('MatchHistoryDetails', {
                    matchId: item.id,
                  });
                }}
              >
                <Text style={styles.bubbleSubtitle}>
                  {parseSubtitle({
                    opponentName: opponent.name,
                    date: item.startTime,
                  })}
                </Text>
              </Pressable>
            </View>
            <View>
              <Image
                source={{
                  uri: 'https://cdn.dribbble.com/users/113499/screenshots/7146093/space-cat.png',
                }}
                alt='Alternate Text'
                size='xs'
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 20,
                  marginRight: 15,
                  marginTop: 5,
                  borderWidth: 4,
                  borderColor: 'gray',
                }}
              />
            </View>
          </Animated.View>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#1c2141',
  },
  bubble: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    borderWidth: 2,
    paddingLeft: 13,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  bubbleIcon: {
    marginTop: 3,
    marginRight: 10,
  },
  bubbleTitle: {
    fontWeight: '600',
    color: '#1d284b',
    fontSize: 20,
  },
  bubbleSubtitle: {
    fontSize: 13,
    color: '#767676',
  },
  bubbleInnerContainer: {
    marginRight: 10,
    marginTop: 7,
  },
});
