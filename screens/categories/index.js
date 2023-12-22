import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

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

  const baseDelay = 100;

  return (
    <View style={styles.container}>
      {/* list a array of categories */}

      {categories.map((category, index) => (
        <Animatable.View
          animation='bounceIn'
          duration={800}
          key={category.id}
          delay={baseDelay * index}
        >
          <Pressable
            style={{
              ...styles.button,
            }}
            key={category.id}
            color='#fff'
            onPress={() =>
              navigation.navigate('Queue', {
                categoryId: category.id,
                categoryName: category.name,
              })
            }
          >
            <Text style={styles.text}>{category.name}</Text>
          </Pressable>
        </Animatable.View>
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
    border: '1px solid #000',
    borderRadius: '5px',
    backgroundColor: '#f95656',
    color: '#fff',
  },
  text: {
    fontSize: '1.5rem',
    color: '#fff',
  },
});
