import React from 'react';
import { Text, View } from 'react-native';
import AgainButtons from './AgainButtons';

export default function ScoreCard({
  player1,
  player2,
  player2Id,
  scores1 = [],
  scores2 = [],
  categoryName,
  handleRematch,
}) {
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
          backgroundColor,
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

  const renderScoreRow = (scores, includeNumbers, usePink) => {
    return (
      <View style={{ flexDirection: 'row', gap: 5 }}>
        {scores.map((score, index) => (
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
            amount: scores?.reduce((a, b) => a + parseFloat(b), 0),
            usePink,
          })}
          {includeNumbers && (
            <Text
              style={{
                fontFamily: 'poppins-semiBold',
                color: usePink ? '#EC80B4' : '#3F95F2',
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

  const totalScore1 = scores1.reduce((a, b) => a + parseFloat(b), 0);
  const totalScore2 = scores2.reduce((a, b) => a + parseFloat(b), 0);
  const usePinkForTotal1 = totalScore1 >= totalScore2;

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
          textTransform: 'capitalize',
        }}
      >
        {player1}
      </Text>
      {renderScoreRow(scores1, true, usePinkForTotal1)}
      {renderScoreRow(scores2, false, !usePinkForTotal1)}

      <Text
        style={{
          fontFamily: 'poppins-semiBold',
          fontSize: 18,
          color: '#3F95F2',
          marginTop: 10,
          textAlign: 'center',
          textTransform: 'capitalize',
        }}
      >
        {player2}
      </Text>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AgainButtons
          opponentId={player2Id}
          categoryName={categoryName}
          handleRematch={handleRematch}
        />
      </View>
    </View>
  );
}
