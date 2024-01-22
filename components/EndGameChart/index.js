import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

function EndGameChart({ chartData }) {
  const chartWidth = Dimensions.get('window').width - 36;
  const paddingRight = 20;

  return (
    <View
      style={{
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LineChart
        data={{
          labels: ['1', '2', '3', '4', '5', '6', '7'],
          datasets: [
            {
              data: chartData.playerOne.scores,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: chartData.playerTwo.scores,
              color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={chartWidth + paddingRight}
        height={220}
        yAxisLabel=''
        yAxisSuffix=''
        yAxisInterval={6}
        chartConfig={{
          backgroundColor: '#0062e2',
          backgroundGradientFrom: '#252E5C',
          backgroundGradientTo: '#191D3A',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#26a8ff',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

export default React.memo(EndGameChart);
