import { Box, Divider, FlatList, Heading, Text } from 'native-base';
import React from 'react';
import { newRequest } from '../../api/newRequest';

export default function LeaderboardsScreen() {
  const [leaderboards, setLeaderboards] = React.useState([]);

  const fetchLeaderboards = async () => {
    const response = await newRequest.get('/leaderboards');
    const data = response.data;
    //sort based on item.averageRating
    data.sort((a, b) => b.averageRating - a.averageRating);
    setLeaderboards(data);
  };

  React.useEffect(() => {
    fetchLeaderboards();
  }, []);

  return (
    <Box flex={1} px='4' py='3' bg='white' safeArea>
      <Heading size='xl' color='coolGray.800' mb='4'>
        Leaderboards
      </Heading>
      <FlatList
        data={leaderboards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Box borderBottomWidth='1' borderColor='coolGray.200' pl='4' pr='5' py='2'>
            <Text fontSize='lg' fontWeight='bold' color='emerald.600'>
              {index + 1}. {item.username}
            </Text>
            <Text fontSize='md' color='coolGray.500'>
              Average Rating: {Math.floor(item.averageRating)}
            </Text>
          </Box>
        )}
        ItemSeparatorComponent={() => <Divider my='2' />}
      />
    </Box>
  );
}
