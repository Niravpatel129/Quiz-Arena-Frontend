import { Box, Divider, FlatList, Heading, Text } from 'native-base';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { newRequest } from '../../api/newRequest';

export default function PlayersScreen({ navigation }) {
  const [users, setUsers] = React.useState([]);
  const [friends, setFriends] = React.useState([]);

  const fetchFriends = async () => {
    const response = await newRequest.get('/users/friends');
    const data = response.data;
    setFriends(data.friends);
  };

  const fetchPlayers = async () => {
    const response = await newRequest.get('/users');
    const data = response.data;
    setUsers(data);
  };

  React.useEffect(() => {
    fetchPlayers();
    fetchFriends();
  }, []);

  const handleChallenge = async (id) => {
    try {
      const gameId = Math.floor(Math.random() * 1000000);

      await newRequest.post('/users/notifications', {
        type: 'gameInvite',
        receiverId: id,
        options: {
          gameId: gameId,
          category: 'Valorant',
        },
      });

      navigation.navigate('Challenge', { gameId: gameId, category: 'Valorant' });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddFriend = async (id) => {
    await newRequest.post('/users/addFriend', { friendId: id });

    fetchFriends();
  };

  return (
    <Box flex={1} px='4' py='3' bg='white' safeArea>
      <>
        <Heading size='xl' color='coolGray.800' mb='4'>
          Friends
        </Heading>
        <FlatList
          data={friends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Box borderBottomWidth='1' borderColor='coolGray.200' pl='4' pr='5' py='2'>
              <Text fontSize='lg' fontWeight={700} color='black'>
                {index + 1}. {item.username}
              </Text>
              <Text fontSize='md' color='coolGray.500'>
                {/* Add Friend */}
                <Pressable style={styles.button} onPress={() => handleChallenge(item._id)}>
                  <Text style={styles.text}>Challenge Friend</Text>
                </Pressable>
              </Text>
            </Box>
          )}
          ItemSeparatorComponent={() => <Divider my='2' />}
        />
      </>
      <>
        <Heading size='xl' color='coolGray.800' mb='4'>
          Users
        </Heading>
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Box borderBottomWidth='1' borderColor='coolGray.200' pl='4' pr='5' py='2'>
              <Text fontSize='lg' fontWeight={700} color='black'>
                {index + 1}. {item.username}
              </Text>
              <Text fontSize='md' color='coolGray.500'>
                {/* Add Friend */}
                <Pressable style={styles.button} onPress={() => handleAddFriend(item._id)}>
                  <Text style={styles.text}>Add Friend</Text>
                </Pressable>
              </Text>
            </Box>
          )}
          ItemSeparatorComponent={() => <Divider my='2' />}
        />
      </>
    </Box>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#61ab5d',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
  },
});
