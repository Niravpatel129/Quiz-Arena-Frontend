import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Scoresheet = () => {
  const renderPlayerName = () => {
    return (
      <View
        style={{
          marginVertical: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            height: 3,
            flex: 1,
            backgroundColor: 'gray',
          }}
        ></View>
        <Text
          style={{
            color: 'lightgray',
            marginHorizontal: 6,
            fontFamily: 'Inter-Black',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          Zezima
        </Text>
        <View
          style={{
            height: 3,
            flex: 1,
            backgroundColor: 'gray',
          }}
        ></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#fff',
          marginVertical: 6,
          fontFamily: 'Inter-Black',
          fontWeight: 'bold',
          fontSize: 22,
        }}
      >
        Game Results
      </Text>
      <View>
        {renderPlayerName()}
        <View style={styles.row}>
          <Text style={styles.cell}>14</Text>
          <Text style={styles.cell}>0</Text>
          <Text style={styles.cell}>10</Text>
          <Text style={styles.cell}>10</Text>
          <Text style={styles.cell}>0</Text>
          <Text style={styles.cell}>10</Text>
          <Text style={styles.cell}>11</Text>
          <Text style={styles.cellTotal}>65</Text>
        </View>
        <View style={styles.between}>
          <View style={[styles.row]}>
            {/* map 8 times */}
            {Array.from(Array(8).keys()).map((i) => {
              return (
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    minWidth: i === 7 ? 55 : 40,
                    textAlign: 'center',
                    color: '#fff',
                    fontFamily: 'Inter-Regular',
                    fontSize: 12,
                  }}
                >
                  {i === 7 ? 'Total' : i + 1}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>17</Text>
          <Text style={styles.cell}>17</Text>
          <Text style={styles.cell}>17</Text>
          <Text style={styles.cell}>17</Text>
          <Text style={styles.cell}>17</Text>
          <Text style={styles.cell}>17</Text>
          <Text style={styles.cell}>17</Text>
          <Text style={styles.cellTotal}>136</Text>
        </View>
        {renderPlayerName()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  cell: {
    borderWidth: 1,
    padding: 10,
    width: 40,
    textAlign: 'center',
    backgroundColor: '#303E5F',
    color: '#fff',
    fontFamily: 'Inter-Black',
    fontWeight: 'bold',
  },
  cellTotal: {
    borderWidth: 1,
    padding: 10,
    width: 55,
    textAlign: 'center',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'Inter-Black',
    fontWeight: 'bold',
  },
  between: {
    // marginVertical: 4,
  },
});

export default Scoresheet;
