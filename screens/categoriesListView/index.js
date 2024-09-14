import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import useCategories from '../../hooks/useCategories';
import CategoryCard from '../homepage/components/CategoryCard';

const { width } = Dimensions.get('window');

const CategoryCardWrapper = ({ item, index, parentCategory }) => {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
  }, []);

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <CategoryCard item={item} parentCategory={parentCategory} />
    </Animated.View>
  );
};

export default function CategoriesListView() {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const route = useRoute();
  const parentCategory = route?.params?.parentCategory;
  const { categories } = useCategories();

  const opacity = useSharedValue(0);

  useEffect(() => {
    console.log('Categories:', categories);
    console.log('Parent Category:', parentCategory);
    opacity.value = withTiming(1, { duration: 500 });
  }, [categories, parentCategory]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (!categories) {
    console.log('Categories are null or undefined');
    return <Text>Loading categories...</Text>;
  }

  const selectedCategory = categories.find(
    (category) => category.parentCategory === parentCategory,
  );

  if (!selectedCategory) {
    console.log('Selected category not found for parent:', parentCategory);
    return <Text>Category not found</Text>;
  }

  console.log('Selected Category:', selectedCategory);

  const filteredSubCategories = selectedCategory.subCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log('Filtered Subcategories:', filteredSubCategories);

  const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(filteredSubCategories);

  const itemSpacing = 10;
  const itemPerRow = 3;
  const totalSpacing = itemSpacing * (itemPerRow - 1);
  const availableWidth = width - totalSpacing;
  const itemWidth = availableWidth / itemPerRow;

  const layoutProvider = new LayoutProvider(
    () => 1,
    (type, dim) => {
      dim.width = itemWidth;
      dim.height = 250;
    },
  );

  const renderRow = (type, item, index) => (
    <CategoryCardWrapper item={item} index={index} parentCategory={parentCategory} />
  );

  return (
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            margin: 0,
            marginBottom: 0,
            marginTop: 20,
          }}
        >
          <Ionicons name='arrow-back' size={24} color='#000' />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'poppins-semiBold',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 0,
            textTransform: 'capitalize',
          }}
        >
          {parentCategory}
        </Text>

        {filteredSubCategories.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No shows found</Text>
        ) : (
          <Animated.View
            style={[
              {
                flex: 1,
                minHeight: 800,
                minWidth: 0,
                marginBottom: 20,
                paddingBottom: 40,
              },
              animatedStyle,
            ]}
          >
            <RecyclerListView
              style={{ flex: 1, width: '100%', height: '120%' }}
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