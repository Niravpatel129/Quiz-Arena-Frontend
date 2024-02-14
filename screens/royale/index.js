// Royale.js
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import AdditionalInformation from './components/AdditionalInformation';
import CountdownTimer from './components/CountdownTimer';
import EventInformation from './components/EventInformation';
import EventTitle from './components/EventTitle';
import GameModeDescription from './components/GameModeDescription';
import GameTips from './components/GameTips';
import JoinQueueButton from './components/JoinQueueButton';

export default function Royale() {
  useEffect(() => {
    // join royale event queue
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      <EventTitle />
      <CountdownTimer />
      <EventInformation />
      <JoinQueueButton />
      <GameTips />
      <AdditionalInformation />
      <GameModeDescription />
    </ScrollView>
  );
}
