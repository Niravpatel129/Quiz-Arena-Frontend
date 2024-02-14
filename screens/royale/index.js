import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Royale() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      {/* Event Title */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Battle Royale Night
      </Text>

      {/* Countdown Timer */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>Countdown to Event: 03:12:45</Text>
      </View>

      {/* Event Information */}
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
        Get ready for the ultimate Battle Royale every Tuesday! Compete against others and win great
        prizes. Make sure you're prepared for an evening of fun, strategy, and challenge.
      </Text>

      {/* Join Queue Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: 'black',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: 'black', fontSize: 16 }}>Join Queue</Text>
      </TouchableOpacity>

      {/* Game Tips/Instructions */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
          Tips for Success
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          - Familiarize yourself with the game rules before joining.
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          - Practice your skills in quick matches.
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          - Team up with friends for a better strategy.
        </Text>
      </View>

      {/* Additional Information */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
          Event Details
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>Date: Every Tuesday</Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>Time: 8 PM - 11 PM</Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>Location: Online</Text>
      </View>

      {/* Game Mode Description */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
          Game Mode: Open Queue Battle Royale
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 5 }}>
          - Limited to 20 players per session.
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 5 }}>
          - Players are placed in a bracket upon joining the queue.
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 5 }}>
          - Compete in head-to-head matches to advance.
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          - The last player standing wins the Battle Royale.
        </Text>
      </View>
    </ScrollView>
  );
}
