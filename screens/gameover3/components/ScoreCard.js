import React from 'react';
import { Text, View } from 'react-native';
import AgainButtons from './AgainButtons';

const fakeScores = ['15', '15', '15', '15', '15', '15', '15'];

export default function ScoreCard() {
  const renderScoreItem = ({ amount = 0, isTotal, usePink }) => {
    let backgroundColor = '#fff';
    let textColor = usePink ? '#EC80B4' : '#3F95F2';

    if (isTotal) {
      backgroundColor = usePink ? '#EC80B4' : '#3F95F2';
      textColor = '#fff';
    }

    return (
      <View
        style={{
          borderRadius: 10,
          width: isTotal ? '105%' : '100%',
          backgroundColor: backgroundColor,
          borderWidth: 1,
          borderColor: textColor,
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'poppins-semiBold',
            color: textColor,
          }}
        >
          {Math.floor(amount)}
        </Text>
      </View>
    );
  };

  const renderScoreRow = (includeNumbers, usePink) => {
    return (
      <View style={{ flexDirection: 'row', gap: 5 }}>
        {fakeScores.map((score, index) => (
          <View style={{ flex: 1, alignItems: 'center' }} key={`score-${index}`}>
            {renderScoreItem({
              isTotal: false,
              amount: score,
              usePink,
            })}
            {includeNumbers && (
              <Text
                style={{
                  fontFamily: 'poppins-semiBold',
                  color: '#5E6064',
                  marginVertical: 10,
                }}
              >
                {index + 1}
              </Text>
            )}
          </View>
        ))}
        <View style={{ flex: 1.2, alignItems: 'center' }} key='total'>
          {renderScoreItem({
            isTotal: true,
            amount: 100,
            usePink,
          })}
          {includeNumbers && (
            <Text
              style={{
                fontFamily: 'poppins-semiBold',
                color: '#EC80B4',
                marginVertical: 10,
              }}
            >
              Total
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        padding: 2,
        width: '100%',
        backgroundColor: '#F4F4F4',
        alignItems: 'stretch',
        paddingVertical: 10,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 18,
          color: '#EC80B4',
          marginBottom: 10,
          textAlign: 'center',
        }}
      >
        Alex
      </Text>
      {renderScoreRow(true, true)}

      {renderScoreRow(false)}
      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 18,
          color: '#3F95F2',
          marginTop: 10,
          textAlign: 'center',
        }}
      >
        John
      </Text>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AgainButtons />
      </View>
    </View>
  );
}
