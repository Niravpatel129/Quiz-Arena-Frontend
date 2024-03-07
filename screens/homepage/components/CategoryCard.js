import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'expo-image';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSound } from '../../../context/sound/SoundContext';

const imageMap = {};

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
          cachePolicy='memory-disk'
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
