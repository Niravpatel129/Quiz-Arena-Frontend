import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function Trophies() {
  const trophies = [
    {
      id: '1',
      title: 'Beta Tester 🏆',
      icon: 'https://cdn-icons-png.flaticon.com/512/8796/8796493.png',
    },
  ];

  // Rendering each item in the flat list
  const renderItem = ({ item }) => (
    <View style={styles.trophyItem}>
      <Image
        source={{
          uri: item.icon,
          headers: {
            Accept: '*/*',
          },
        }}
        style={styles.trophyIcon}
      />
      <Text style={styles.trophyTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 30,
          fontFamily: 'Inter-Black',
        }}
      >
        Trophies
      </Text>
      <FlatList
        data={trophies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

// Styling for the component
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginVertical: 30,
    alignItems: 'center',
  },
  trophyItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  trophyIcon: {
    width: 100,
    height: 100,
  },
  trophyTitle: {
    color: 'white', // Text color for dark theme
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
});
