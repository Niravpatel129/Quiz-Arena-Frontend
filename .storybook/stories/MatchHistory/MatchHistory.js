import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { Image, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { newRequest } from '../../../api/newRequest';
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter';

export default function MatchHistory() {
  const navigation = useNavigation();
  const [matchHistory, setMatchHistory] = useState([]);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const getMatchHistory = async () => {
      const res = await newRequest.get('/matchHistory');
      console.log('🚀  res:', res.data.matchHistory);
      setMatchHistory(res.data.matchHistory);
      setUserId(res.data.userId);
    };

    getMatchHistory();
  }, []);

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const parseSubtitle = ({ opponentName, date }) => {
    // Less than 1 hour ago
    return (
      <>
        You faced {capitalizeFirstLetter(opponentName)} {formatDate(date)}!
      </>
    );
  };

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
      style={{
        paddingHorizontal: 10,
        paddingTop: 20,
        backgroundColor: '#1c2141',
      }}
      data={matchHistory}
      renderItem={({ item }) => {
        const opponent = item.players.find((v) => v.id !== userId);

        return (
          <View
            key={item.id}
            style={[
              styles.bubble,
              {
                justifyContent: 'space-between',
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
                    opponentId: opponent.id,
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
          </View>
        );
      }}
      keyExtractor={(item) => item._id}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 40,
  },
  bubbleContainer: {
    // flex: 1,
    gap: 10,
  },
  bubble: {
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // justifyContent: 'space-between',
    // flex: 1,
    borderRadius: 15,
    borderWidth: 2,
    paddingLeft: 13,
    paddingTop: 20,
    paddingBottom: 20,
    // width: 200,
    // marginHorizontal: 50,
  },
  bubbleIcon: {
    marginTop: 3,
    marginRight: 10,
  },
  bubbleTitle: {
    fontWeight: 600,
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
