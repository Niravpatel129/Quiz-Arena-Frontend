import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function DividerHeader({ headerText, shouldShowArrow }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          fontFamily: 'poppins-regular',
          fontSize: 19,
          color: '#262625',
          textTransform: 'capitalize',
        }}
      >
        {headerText || ''}
      </Text>
      {shouldShowArrow && (
        <TouchableOpacity
          style={{
            backgroundColor: '#F2F2F2',
            padding: 5,
            borderRadius: 100,
          }}
        >
          <Ionicons name='arrow-forward' size={24} color='#392F4D' />
        </TouchableOpacity>
      )}
    </View>
  );
}
