import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { Image, Text, VStack, View } from 'native-base';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function MatchHistory({ matchHistory }) {
  const navigation = useNavigation();

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const parseSubtitle = ({ opponentName, date }) => {
    // Less than 1 hour ago
    return (
      <>
        You beat {opponentName} {formatDate(date)}!
      </>
    );
  };

  return (
    <View height='100%' width='100%' style={styles.container}>
      <Text style={styles.title}>HISTORY</Text>
      <View style={styles.bubbleContainer}>
        {matchHistory.map((match, index) => (
          <VStack key={index} style={styles.bubble}>
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
              <Text style={styles.bubbleTitle}>{match.category}</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('MatchHistoryDetails', {
                    matchId: match.id,
                  });
                }}
              >
                <Text style={styles.bubbleSubtitle}>
                  {parseSubtitle({
                    opponentName: match.opponent.name,
                    opponentId: match.opponent.id,
                    date: match.date,
                  })}
                </Text>
              </Pressable>
            </View>
          </VStack>
        ))}
      </View>
    </View>
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
    gap: 5,
  },
  bubbleIcon: {
    // width: 40,
    // height: 40,
    marginTop: 3,
  },
  bubbleTitle: {
    fontWeight: 600,
    fontSize: 20,
  },
  bubbleSubtitle: {
    fontSize: 16,
    // flex: 1,
    // width: 200
    // flexWrap: 'wrap',
    // flexShrink: 1,
    // flexGrow: 12,
  },

  bubbleInnerContainer: {
    // paddingLeft: 10,
    flex: 1,
  },
});
