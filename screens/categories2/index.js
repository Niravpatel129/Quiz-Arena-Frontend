import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const categories = [
  {
    main: 'Tv Shows',
    subCategories: ['logos', 'logos', 'logos', 'logos', 'logos'],
  },
  {
    main: 'Movies',
    subCategories: [
      'general knowledge',
      'general knowledge',
      'general knowledge',
      'general knowledge',
      'general knowledge',
    ],
  },
  {
    main: 'General',
    subCategories: ['Friends', 'The Office', 'The Simpsons', 'The Office', 'The Simpsons'],
  },
  {
    main: 'Music',
    subCategories: ['Friends', 'The Office', 'The Simpsons', 'The Office', 'The Simpsons'],
  },
  {
    main: 'Tv Shows',
    subCategories: ['Friends', 'The Office', 'The Simpsons', 'The Office', 'The Simpsons'],
  },
];

const ImageMap = {
  Movies: 'https://i.pinimg.com/originals/4b/14/25/4b142585f92f62e3e2f372b174fb82a6.jpg',
};

export default function Categories2({ navigation }) {
  const [searchInput, setSearchInput] = React.useState('');

  const onChangeText = (text) => {
    setSearchInput(text);
  };

  const renderCategoryBox = ({ categoryTitle }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Queue', {
            categoryId: categoryTitle.split(' ').join('-'),
            categoryName: categoryTitle,
          })
        }
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: 'https://i.pinimg.com/originals/4b/14/25/4b142585f92f62e3e2f372b174fb82a6.jpg',
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 5,
          }}
        >
          {categoryTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCategories = () => {
    return categories.map((category, index) => {
      return (
        <View
          key={index}
          style={{
            marginVertical: 10,
            width: '100%',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            {category.main}
          </Text>
          <FlatList
            ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
            data={category.subCategories}
            renderItem={({ item }) => renderCategoryBox({ categoryTitle: item })}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: 'row',
              margin: 10,
            }}
          />
        </View>
      );
    });
  };
  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ height: '100%' }}>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            // backgroundColor: '#1c2141',
            padding: 10,
            height: '100%',
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                position: 'relative',
              }}
            >
              <TextInput
                placeholder='Search Quiz Category'
                placeholderTextColor='white'
                style={{
                  marginBottom: 10,
                  flex: 1,
                  color: 'white',
                  fontSize: 19,
                  fontFamily: 'Inter-Regular',
                  padding: 16,
                  backgroundColor: '#516696',
                  borderColor: 'white',
                  borderWidth: 1,
                  borderRadius: 20,
                }}
                onChangeText={onChangeText}
                value={searchInput}
              />

              <Ionicons
                style={{
                  position: 'absolute',
                  right: 16,
                  top: 17,
                }}
                name='search'
                size={24}
                color='white'
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {renderCategories()}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
