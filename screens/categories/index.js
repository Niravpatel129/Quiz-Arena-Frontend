import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CategoriesScreen({ navigation }) {
  const categories = [
    {
      id: 1,
      name: 'Logos',
    },
    {
      id: 2,
      name: 'League of Legends',
    },
    {
      id: 3,
      name: 'Valorant',
    },
  ];
  return (
    <View style={styles.container}>
      {/* list a array of categories */}
      {categories.map((category) => (
        <Pressable
          style={styles.button}
          key={category.id}
          onPress={() =>
            navigation.navigate('Queue', {
              categoryId: category.id,
              categoryName: category.name,
            })
          }
        >
          <Text style={styles.text}>{category.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '1rem',
  },
  button: {
    // margin: '1rem',
    marginBottom: '1rem',
    width: '100%',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#ff6d6d',
    color: '#fff',
  },
  text: {
    fontSize: '1.5rem',
    color: '#fff',
  },
});
