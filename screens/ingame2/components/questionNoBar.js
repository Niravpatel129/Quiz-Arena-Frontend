import React from 'react';
import { Text, View } from 'react-native';

export default function QuestionNoBar({ roundNumber }) {
  return (
    <View
      style={{
        marginVertical: 20,
        marginHorizontal: 5,
      }}
    >
      <Text
        style={{
          color: '#5E6064',
          fontFamily: 'poppins-regular',
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        Question No. {roundNumber || 1}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {Array.from({ length: 7 }).map((_, index) => {
          const filled = index - 1 < roundNumber;

          return (
            <View
              key={index}
              style={{
                height: 5,
                backgroundColor: filled ? '#3F95F2' : '#E8E8E8',
                borderRadius: 10,
                flex: 1,
              }}
            ></View>
          );
        })}
      </View>
    </View>
  );
}
