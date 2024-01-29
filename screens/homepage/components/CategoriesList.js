import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import DividerHeader from './DividerHeader';

const imageMap = {
  logos: require('./images/logos.png'),
  friends: require('./images/friends.png'),
  'the office': require('./images/the_office.png'),
  flags: require('./images/flags.png'),
  basketball: require('./images/basketball.png'),
  capitals: require('./images/capitals.png'),
  chemistry: require('./images/chemistry.png'),
  biology: require('./images/biology.png'),
  mathematics: require('./images/mathematics.png'),
  physics: require('./images/physics.png'),
  soccer: require('./images/soccer.png'),
  cricket: require('./images/cricket.png'),
  naruto: require('./images/naruto.png'),
  'one piece': require('./images/one_piece.png'),
  'attack on titan': require('./images/attack_on_titan.png'),
  'game of thrones': require('./images/game_of_thrones.png'),
  valorant: require('./images/valorant.png'),
  'league of legends': require('./images/league_of_legends.png'),
  overwatch: require('./images/overwatch.png'),
  'pokemon gen 1': require('./images/pokemon_gen_1.png'),
  'general knowledge': require('./images/general_knowledge.png'),
  landmarks: require('./images/landmarks.png'),
  scientists: require('./images/scientists.png'),
  'harry potter': require('./images/harry potter.png'),
  'taarak mehta ka ooltah chashmah': require('./images/taarak mehta ka ooltah chashmah.png'),
};

function CategoryCard({ item, parentCategory }) {
  const navigation = useNavigation();
  const [imageSource, setImageSource] = useState(
    imageMap[item.name] || {
      uri:
        item.logo ||
        'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
    },
  );

  const handleImageError = () => {
    if (!imageMap[item.name]) {
      setImageSource({
        uri:
          item.logo ||
          'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
      });
    }
  };

  const nameId = item.name.split(' ').join('-');

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          marginRight: 10,
        }}
        onPress={() => {
          navigation.navigate('CategoryScreen', {
            categoryId: nameId,
            categoryName: item.name,
            parentCategory: parentCategory,
            categoryImage: item.logo || 'default_image_url',
          });
        }}
      >
        <ImageBackground
          source={imageSource}
          onError={handleImageError}
          style={{
            width: 120,
            height: 160,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: 2,
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              width: '100%',
              height: '100%',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
          >
            <View></View>
            <Ionicons name='play-circle' size={40} color='#fff' />
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: '#1d284b',
          textTransform: 'capitalize',
          maxWidth: 90,
          textAlign: 'center',
          flexWrap: 'wrap',
          flexShrink: 1,
        }}
      >
        {item.name}
      </Text>
    </View>
  );
}

export default function CategoriesList({ parentCategory, subCategories }) {
  const offset = useSharedValue(50);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: offset.value }],
    };
  });

  useEffect(() => {
    offset.value = withSpring(0, { stiffness: 150 });
    opacity.value = withSpring(1);
  }, []);

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <DividerHeader headerText={parentCategory} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={subCategories}
        renderItem={({ item }) => <CategoryCard item={item} parentCategory={parentCategory} />}
      />
    </Animated.View>
  );
}
