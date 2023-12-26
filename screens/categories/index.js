import { VStack } from 'native-base';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function CategoriesScreen({ navigation, route }) {
  const categories = [
    {
      id: 1,
      name: 'Logos',
    },
  ];

  const baseDelay = 100;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#f2f2f2',
        },
      ]}
    >
      <VStack space={4} alignItems='stretch'>
        {categories.map((category, index) => (
          <Animatable.View
            animation='bounceIn'
            duration={800}
            key={category.id}
            delay={baseDelay * index}
          >
            <Pressable
              style={styles.categoryButton}
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
          </Animatable.View>
        ))}
      </VStack>

      <Text
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontSize: 20,
          textAlign: 'center',
          color: '#000',
        }}
      >
        Extra
      </Text>

      {/* add a button to go to leaderboards */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('Leaderboards')}>
        <Text style={styles.text}>Leaderboards</Text>
      </Pressable>

      {/* add a button to go to leaderboards */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('Players')}>
        <Text style={styles.text}>Players</Text>
      </Pressable>

      {/* add a button to go to notifications */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('Notifications')}>
        <Text style={styles.text}>Notifications</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 10,
    padding: 10,
  },
  categoryButton: {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#56b2f9',
    color: '#fff',
    // height: 40,
    padding: 10,
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#f95656',
    color: '#fff',
    // height: 40,
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});
