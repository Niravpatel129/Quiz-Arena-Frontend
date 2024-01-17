import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Toast from 'react-native-toast-message';
import { newRequest } from '../../api/newRequest';
import { NotificationsProvider } from '../../context/notifications/notificationsContext';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';

function CategoryBox({ categoryTitle, parentCategory, navigation, fadeAnim }) {
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
          navigation.navigate('CategoryScreen', {
            categoryId: categoryTitle.name.split(' ').join('-'),
            categoryName: categoryTitle.name,
            parentCategory: parentCategory,
            categoryImage: categoryTitle.image,
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
            fontWeight: 700,
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
    const getStreak = async () => {
      try {
        const streakData = await AsyncStorage.getItem('streak');
        let streak = streakData
          ? JSON.parse(streakData)
          : { streak: 0, date: new Date().toISOString(), toastShown: false };

        console.log('🚀  streak:', streak);
        const currentDate = new Date();
        const lastStreakDate = new Date(streak.date);

        // Check if the current day is different from the last streak date
        if (currentDate.toDateString() !== lastStreakDate.toDateString()) {
          // Reset toastShown flag if it's a different day
          streak.toastShown = false;

          // Reset streak if more than one day has passed
          if (currentDate - lastStreakDate > 24 * 60 * 60 * 1000) {
            streak.streak = 0;
          }

          // Increment streak and update date
          streak.streak++;
          streak.date = currentDate.toISOString();
          console.log('🚀  streak:', streak);
          await AsyncStorage.setItem('streak', JSON.stringify(streak));
        }

        // Show toast only if it hasn't been shown today
        if (!streak.toastShown) {
          const wittyText = ['You are on a roll!', 'You are on fire!', 'You are a beast!'];
          console.log('showing toast');
          Toast.show({
            position: 'bottom',
            type: 'success',
            text1: 'You have a streak of ' + (streak.streak + 1) + ' days!',
            text2: wittyText[Math.floor(Math.random() * wittyText.length)],
          });

          // Update the flag to indicate that the toast has been shown
          streak.toastShown = true;
          await AsyncStorage.setItem('streak', JSON.stringify(streak));
        }
      } catch (error) {
        console.error('Error managing streak:', error);
      }
    };

    getStreak();
  }, []);

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

  const renderCategories = () => {
    const filteredCategories = categories.filter((category) => {
      return (
        category.parentCategory.toLowerCase().includes(searchInput.toLowerCase()) ||
        category.subCategories.some((sub) =>
          sub.name.toLowerCase().includes(searchInput.toLowerCase()),
        )
      );
    });

    return filteredCategories.map((category, index) => {
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
              fontWeight: 700,
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
              <CategoryBox
                categoryTitle={item}
                parentCategory={category.parentCategory}
                navigation={navigation}
                fadeAnim={fadeAnim}
              />
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
                    top: 34,
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
