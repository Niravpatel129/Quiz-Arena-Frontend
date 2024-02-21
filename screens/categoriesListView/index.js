import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import useCategories from '../../hooks/useCategories';
import CategoryCard from '../homepage/components/CategoryCard';

const { width } = Dimensions.get('window');

export default function CategoriesListView() {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const parentCategory = useRoute()?.params?.parentCategory;
  const { categories } = useCategories();

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, [categories]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (!categories) return null;

  const selectedCategory = categories.find(
    (category) => category.parentCategory === parentCategory,
  );

  if (!selectedCategory) return null;

  const filteredSubCategories = selectedCategory.subCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(filteredSubCategories);

  const layoutProvider = new LayoutProvider(
    () => 1, // Assuming all items have the same type
    (type, dim) => {
      dim.width = width / 3; // Adjusted for 3 items per row
      dim.height = 250; // Adjust the height as per your requirement
    },
  );

  const renderRow = (type, item) => (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <CategoryCard item={item} parentCategory={parentCategory} />
    </Animated.View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ margin: 20, marginBottom: 0 }}
        >
          <Ionicons name='arrow-back' size={24} color='#000' />
        </TouchableOpacity>
        <TextInput
          placeholder='Search'
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 20,
            fontFamily: 'poppins-regular',
            fontSize: 16,
            color: '#000',
            margin: 10,
            marginBottom: 0,
          }}
        />
        {filteredSubCategories.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No shows found</Text>
        ) : (
          <Animated.View
            style={{
              flex: 1,
              minHeight: 200,
              minWidth: 200,
            }}
          >
            <RecyclerListView
              style={{ flex: 1, width: '100%', height: '100%' }}
              rowRenderer={renderRow}
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              scrollViewProps={{
                showsHorizontalScrollIndicator: false,
                scrollEnabled: false,
              }}
            />
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
