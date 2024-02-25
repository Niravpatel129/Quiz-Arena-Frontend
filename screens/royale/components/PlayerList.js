import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

export default function PlayersList({ players }) {
  console.log('🚀 players:', players);
  if (!players) return null;
  const playersRemaining = players.filter((v) => {
    return v.status === 'queued' || v.status === 'waiting-next-round';
  }).length;

  const getStatusIcon = (status) => {
    console.log('🚀  status:', status);
    switch (status) {
      case 'waiting-next-round':
        return { name: 'hourglass-empty', color: 'orange' };
      case 'eliminated':
        return { name: 'close', color: 'gray' };
      case 'winner':
        return { name: 'emoji-events', color: 'gold' };
      case 'queued':
        return { name: 'forward', color: 'black' };
      default:
        return { name: 'help-outline', color: 'black' };
    }
  };

  // Sort players by status and then by wins (You may need to adjust this based on the new statuses)
  const sortedPlayers = players.sort((a, b) => {
    // Define the order for statuses
    const statusOrder = { winner: 1, queued: 2, 'waiting-next-round': 3, eliminated: 4 };

    // Compare by status first
    if (statusOrder[a.status] < statusOrder[b.status]) return -1;
    if (statusOrder[a.status] > statusOrder[b.status]) return 1;

    // If statuses are the same, then sort by wins (descending)
    return b.wins - a.wins;
  });

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 30,
        }}
      >
        {playersRemaining === 0 ? (
          'Players'
        ) : (
          <>
            {playersRemaining} Player{playersRemaining > 1 ? 's' : ''} Remaining
          </>
        )}
      </Text>
      <ScrollView style={{ padding: 10 }}>
        {/* Table Header */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
        >
          <Text style={{ flex: 3, fontWeight: 'bold' }}>Player</Text>
          <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'right' }}>Wins</Text>
        </View>
        {/* Player Items */}
        {sortedPlayers.map((player, index) => (
          <View
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          >
            <Image
              source={{ uri: player.userAvatar }}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textDecorationLine: player.status === 'eliminated' ? 'line-through' : 'none',
                }}
              >
                {player.username}
              </Text>
              <MaterialIcons
                name={getStatusIcon(player.status).name}
                size={24}
                color={getStatusIcon(player.status).color}
                style={{ marginRight: 5 }}
              />
            </View>

            <Text
              style={{
                flex: 1,
                fontSize: 16,
                textAlign: 'right',
                textDecorationLine: player.status === 'eliminated' ? 'line-through' : 'none',
              }}
            >
              {player.wins}W
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
