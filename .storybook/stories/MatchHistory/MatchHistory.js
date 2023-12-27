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
        You beat {capitalizeFirstLetter(opponentName)} {formatDate(date)}!
      </>
    );
  };

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
      style={{
        padding: 20,
      }}
      data={matchHistory}
      renderItem={({ item }) => {
        const opponent = item.players.find((v) => v.id !== userId);

        return (
          <View key={item.id} style={styles.bubble}>
            <View style={styles.bubbleIcon}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170688.png',
                }}
                alt='Alternate Text'
                size='xs'
                style={{ width: 45, height: 45 }}
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
          </View>
        );
      }}
      keyExtractor={(item) => item._id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 20,
  },
  bubbleContainer: {
    // flex: 1,
    gap: 10,
  },
  bubble: {
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#fff',
    // justifyContent: 'space-between',
    // flex: 1,
    borderRadius: 50,
    borderWidth: 2,
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 20,
    // width: 200,
    // marginHorizontal: 50,
  },
  bubbleIcon: {
    marginTop: 3,
    marginRight: 20,
  },
  bubbleTitle: {
    fontWeight: 600,
    fontSize: 20,
  },
  bubbleSubtitle: {
    fontSize: 16,
  },

  bubbleInnerContainer: {},
});
