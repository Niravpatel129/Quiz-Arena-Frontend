import { Center, VStack } from 'native-base';
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
      <VStack space={4} alignItems='center'>
        {categories.map((category, index) => (
          <Animatable.View
            animation='bounceIn'
            duration={800}
            key={category.id}
            delay={baseDelay * index}
          >
            <Pressable
              style={{}}
              key={category.id}
              color='#fff'
              onPress={() =>
                navigation.navigate('Queue', {
                  categoryId: category.id,
                  categoryName: category.name,
                })
              }
            >
              <Center w='64' h='20' bg='indigo.300' rounded='md' shadow={3}>
                <Text style={styles.text}>{category.name}</Text>
              </Center>
            </Pressable>
          </Animatable.View>
        ))}
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
    borderRadius: '5px',
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
