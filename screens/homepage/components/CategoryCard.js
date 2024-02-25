import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { useSound } from '../../../context/sound/SoundContext';

const imageMap = {
  logos: require('./images/logos.png'),
  friends: require('./images/friends.png'),
  'the office': require('./images/the_office.png'),
  flags: require('./images/flags.png'),
  basketball: require('./images/basketball.png'),
  capitals: require('./images/capitals.jpg'),
  chemistry: require('./images/chemistry.png'),
  biology: require('./images/biology.png'),
  mathematics: require('./images/mathematics.png'),
  psychology: require('./images/psychology.jpeg'),
  physics: require('./images/physics.png'),
  soccer: require('./images/soccer.png'),
  cricket: require('./images/cricket.png'),
  naruto: require('./images/naruto.png'),
  'one piece': require('./images/one_piece.png'),
  'attack on titan': require('./images/attack_on_titan.png'),
  'game of thrones': require('./images/game_of_thrones.png'),
  valorant: require('./images/valorant.png'),
  'league of legends': require('./images/league_of_legends.jpeg'),
  overwatch: require('./images/overwatch.png'),
  'pokemon gen 1': require('./images/pokemon_gen_1.png'),
  'general knowledge': require('./images/general_knowledge.png'),
  landmarks: require('./images/landmarks.png'),
  scientists: require('./images/scientists.png'),
  'harry potter': require('./images/harry_potter.png'),
  'taarak mehta ka ooltah chashmah': require('./images/tmkoc.jpeg'),
  'mental math': require('./images/mental_math.jpg'),
  space: require('./images/space.png'),
  'world war 1': require('./images/world_war_1.jpg'),
  'british sitcoms': require('./images/british_sitcoms.jpg'),
  disney: require('./images/disney.jpg'),
  'formula 1': require('./images/formula_1.png'),
  golf: require('./images/golf.jpg'),
  'horse racing': require('./images/horse_racing.jpg'),
  nascar: require('./images/nascar.jpg'),
  'soap opera': require('./images/soap_opera.jpg'),
  'the simpsons': require('./images/the_simpsons.jpg'),
  'us geography': require('./images/us_geography.jpg'),
  'world cup': require('./images/world_cup.jpg'),
  'american football': require('./images/american_football.jpg'),
  'golden state warriors': require('./images/golden_state_warriors.png'),
  'james bond': require('./images/james_bond.jpeg'),
  'liverpool football club': require('./images/liverpool_football_club.jpg'),
  'movie quotes': require('./images/movie_quotes.jpg'),
  'movies since 2010': require('./images/movies_since_2010.jpg'),
  'solar system': require('./images/solar_system.jpeg'),
  'winter sports': require('./images/winter_sports.jpg'),
  'rugby league': require('./images/rugby_league.jpg'),
  'science general': require('./images/science_general.jpg'),
  'british films': require('./images/british_films.jpg'),
  'hunter x hunter': require('./images/hunter_x_hunter.jpg'),
  'dragon ball series': require('./images/dragon_ball_series.jpeg'),
  'hunger games': require('./images/hunger_games.jpg'),
  'size comparison': require('./images/size_comparison.png'),
  'what happened first': require('./images/what_happened_first.jpg'),
  'baby animals': require('./images/baby_animals.jpg'),
};

function CategoryCard({ item, parentCategory }) {
  const { playSound } = useSound();
  const navigation = useNavigation();
  const [imageSource, setImageSource] = useState(
    imageMap[item.name?.toLowerCase()] || {
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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pressable
        style={{
          borderRadius: 16,
          overflow: 'hidden',
        }}
        onPress={() => {
          playSound('click');
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
            <Ionicons name='play-circle' size={40} color='#fff' />
          </View>
        </ImageBackground>
      </Pressable>
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
          marginTop: 4,
          height: 50,
        }}
      >
        {item.name}
      </Text>
    </View>
  );
}

export default CategoryCard;
