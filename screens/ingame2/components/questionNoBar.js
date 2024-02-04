import React from 'react';
import { Text, View } from 'react-native';

export default function QuestionNoBar({ roundNumber }) {
  return (
    <View
      style={{
        marginTop: 15,
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
        Question No. {roundNumber - 1 || 1}
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
          const filled = index < roundNumber - 1;
          let fillColor = '#E8E8E8';

          if (filled) {
            fillColor = '#3F95F2';
          }

          if (index == roundNumber - 2) {
            fillColor = '#EC80B4';
          }

          // if its current make it orangeish, if its passed make it blueish

          return (
            <View
              key={index}
              style={{
                height: 5,
                backgroundColor: fillColor,
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
