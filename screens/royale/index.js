// Royale.js
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RoyaleIntro from '../../components/RoyaleIntro/RoyaleIntro';
import socketService from '../../services/socketService';
import AdditionalInformation from './components/AdditionalInformation';
import CountdownTimer from './components/CountdownTimer';
import EventInformation from './components/EventInformation';
import EventTitle from './components/EventTitle';
import GameModeDescription from './components/GameModeDescription';
import GameTips from './components/GameTips';
import JoinQueueButton from './components/JoinQueueButton';

export default function Royale() {
  const navigation = useNavigation();
  const [roomData, setRoomData] = React.useState({});
  const [showIntroduction, setShowIntroduction] = useState(false);

  const joinChallengeQueue = (challengeId) => {
    socketService.emit('joinChallengeQueue', {
      gameId: challengeId,
      category: 'logos',
      mode: 'royale',
    });
  };

  useEffect(() => {
    setTimeout(() => {
      console.log('Joining room');
      socketService.emit('joinRoyalRoom');

      socketService.on('roomStatus', (data) => {
        console.log('Room status', data);
        setRoomData(data);
      });

      socketService.on('royalStart', (data) => {
        console.log('Royal started');
      });

      socketService.on('joinedRoyalQueue', (data) => {
        console.log('Joined room', data);
        // alert('Joined room');
      });

      socketService.on('matchChallenge', (data) => {
        console.log('Match challenge', data);
        joinChallengeQueue(data.gameChallengeQueueId);
      });

      socketService.on('game_start', (data) => {
        console.log('Game started', data);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Game',
              params: {
                game: data.game,
                gameSessionId: data.gameSessionId,
                players: data.players,
              },
            },
          ],
        });
      });
    }, 500);

    return () => {
      socketService.off('royal_game_start');
      socketService.off('joinedRoyalQueue');
      socketService.off('matchChallenge');
      socketService.off('game_start');
    };
  }, []);

  if (showIntroduction) {
    return <RoyaleIntro setShowIntroduction={setShowIntroduction} />;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      <EventTitle />
      <CountdownTimer />
      <EventInformation />
      <JoinQueueButton />
      <TouchableOpacity onPress={() => setShowIntroduction(true)}>
        <Text
          style={{
            textAlign: 'center',
          }}
        >
          Introduction
        </Text>
      </TouchableOpacity>
      <GameTips />
      <AdditionalInformation />
      <GameModeDescription />
      <View>
        {/* players and their status */}
        {roomData.players &&
          roomData.players.map((player) => (
            <View key={player.socketId}>
              <Text>{player.username}</Text>
              <Text>{player.status}</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
