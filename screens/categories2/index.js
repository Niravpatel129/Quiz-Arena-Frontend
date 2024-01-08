import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { newRequest } from '../../api/newRequest';
import { NotificationsProvider } from '../../context/notifications/notificationsContext';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';

const categories2 = [
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

function CategoryBox({ categoryTitle, navigation, fadeAnim }) {
  const scaleAnim = useState(new Animated.Value(0.5))[0]; // Initial scale value

  const onImageLoad = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        marginLeft: 10,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Queue', {
            categoryId: categoryTitle.name.split(' ').join('-'),
            categoryName: categoryTitle.name,
          })
        }
      >
        <Image
          style={{
            width: 100,
            height: 100,
            borderWidth: 2,
            borderColor: '#516696',
            borderRadius: 20,
          }}
          // blurRadius={0.5}
          source={{
            uri:
              categoryTitle.image ||
              'https://cdn.dribbble.com/userupload/9424324/file/original-6e071eda3550f1a2c8fe70792dc31d7e.png?resize=400x0',
          }}
          onLoad={onImageLoad}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            textAlign: 'center',
            marginTop: 5,
            maxWidth: 100,
            fontWeight: 'bold',
            fontFamily: 'Inter-Bold',
          }}
        >
          {capitalizeFirstLetter(categoryTitle.name)}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function Categories2({ navigation }) {
  const [searchInput, setSearchInput] = React.useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value
  const [categories, setCategories] = useState([]);
  const scaleAnim = useState(new Animated.Value(0.5))[0]; // Initial scale value

  useEffect(() => {
    const fetchData = async () => {
      const res = await newRequest('/homepage/list');
      setCategories(res.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const onChangeText = (text) => {
    setSearchInput(text);
  };

  const renderCategoryBox = ({ categoryTitle }) => {
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          marginLeft: 10,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Queue', {
              categoryId: categoryTitle.name.split(' ').join('-'),
              categoryName: categoryTitle.name,
            })
          }
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderWidth: 2,
              borderColor: '#516696',
              borderRadius: 20,
            }}
            blurRadius={0.5}
            source={{
              uri:
                categoryTitle.image ||
                'https://cdn.dribbble.com/userupload/9424324/file/original-6e071eda3550f1a2c8fe70792dc31d7e.png?resize=400x0',
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              textAlign: 'center',
              marginTop: 5,
              maxWidth: 100,
              fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
            }}
          >
            {capitalizeFirstLetter(categoryTitle.name)}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderCategories = () => {
    return categories.map((category, index) => {
      return (
        <View
          key={index}
          style={{
            // marginVertical: 10,
            marginBottom: 10,
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
              textAlign: 'left',
            }}
          >
            {capitalizeFirstLetter(category.parentCategory)}
          </Text>
          <FlatList
            ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
            data={category.subCategories}
            renderItem={({ item }) => (
              <CategoryBox categoryTitle={item} navigation={navigation} fadeAnim={fadeAnim} />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: 'row',
              // margin: 10,
            }}
          />
        </View>
      );
    });
  };

  return (
    <NotificationsProvider>
      <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ height: '100%' }}>
        <SafeAreaView style={{}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: '100%',
              // marginTop: 20,
            }}
          >
            <View
              style={{
                marginBottom: 40,
              }}
            >
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
                    margin: 10,
                    marginTop: 20,
                    marginBottom: 10,
                    flex: 1,
                    color: 'white',
                    fontSize: 19,
                    fontFamily: 'Inter-Regular',
                    padding: 16,
                    backgroundColor: '#1c2141',
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
                    right: 22,
                    top: 27,
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
    </NotificationsProvider>
  );
}
