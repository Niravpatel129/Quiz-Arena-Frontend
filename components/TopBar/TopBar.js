import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TopBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Text>☰</Text> {/* Hamburger Icon */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
  },
});

export default TopBar;
