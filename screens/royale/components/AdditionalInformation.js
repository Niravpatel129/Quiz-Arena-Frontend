// AdditionalInformation.js
import React from 'react';
import { Text, View } from 'react-native';

const AdditionalInformation = () => (
  <View style={{ marginBottom: 20 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
      Event Details
    </Text>
    <Text style={{ fontSize: 16, textAlign: 'center' }}>Date: Every Tuesday</Text>
    <Text style={{ fontSize: 16, textAlign: 'center' }}>Time: 8 PM - 11 PM</Text>
    <Text style={{ fontSize: 16, textAlign: 'center' }}>Location: Online</Text>
  </View>
);

export default AdditionalInformation;
