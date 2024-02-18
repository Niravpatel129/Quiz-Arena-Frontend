// Royale.js
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import RoyaleIntro from '../../components/RoyaleIntro/RoyaleIntro';
import socketService from '../../services/socketService';
import EventTitle from './components/EventTitle';
import JoinQueueButton from './components/JoinQueueButton';
import PlayersList from './components/PlayerList';

export default function Royale() {
  const navigation = useNavigation();
  const [roomData, setRoomData] = React.useState({});
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [isInQueue, setIsInQueue] = useState(false);

  const joinChallengeQueue = (challengeId) => {
    socketService.emit('joinChallengeQueue', {
      gameId: challengeId,
      category: 'logos',
      mode: 'royale',
    });
  };

  useEffect(() => {
    // connect socket if not connected
    if (!socketService.connected) {
      socketService.connect();
    }

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

      socketService.on('royaleMessage', (data) => {
        console.log('Royale message', data);
        Toast.show({
          type: 'info',
          text1: data.message,
          position: 'bottom',
        });
      });

      socketService.on('updateQueueStatus', (data) => {
        console.log('🚀 ~ file: JoinQueueButton.js ~ line 39 ~ socketService.on ~ data', data);
        setIsInQueue(data.isInQueue);
      });
    }, 500);

    return () => {
      socketService.off('royal_game_start');
      socketService.off('joinedRoyalQueue');
      socketService.off('matchChallenge');
      socketService.off('game_start');
      socketService.off('royaleMessage');
      socketService.off('updateQueueStatus');
    };
  }, []);

  if (showIntroduction) {
    return <RoyaleIntro setShowIntroduction={setShowIntroduction} />;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      <EventTitle setShowIntroduction={setShowIntroduction} />
      {/* <CountdownTimer /> */}
      {/* <EventInformation /> */}
      {roomData.roomStatus !== 'completed' && (
        <JoinQueueButton
          status={roomData.roomStatus}
          players={roomData.players}
          isInQueue={isInQueue}
        />
      )}
      {/* <JoinQueueButton status={roomData.roomStatus} /> */}
      <PlayersList players={roomData.players} />

      {/* <GameTips /> */}
      {/* <AdditionalInformation /> */}
      {/* <GameModeDescription /> */}
      <View>
        {/* players and their status */}
        {/* {roomData.players &&
          roomData.players.map((player) => (
            <View key={player.socketId}>
              <Text>{player.username}</Text>
              <Text>{player.status}</Text>
            </View>
          ))} */}
      </View>
    </ScrollView>
  );
}
