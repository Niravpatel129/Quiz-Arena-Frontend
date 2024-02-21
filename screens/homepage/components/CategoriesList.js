import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import CategoryCard from './CategoryCard';
import DividerHeader from './DividerHeader';

const { width } = Dimensions.get('window');

export default function CategoriesList({ parentCategory, subCategories }) {
  const offset = useSharedValue(50);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: offset.value }],
  }));

  useEffect(() => {
    offset.value = withSpring(0, { stiffness: 150 });
    opacity.value = withSpring(1);
  }, []);

  // Ensure the DataProvider receives an updated list when subCategories changes
  const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(subCategories);

  const layoutProvider = new LayoutProvider(
    () => 0, // Assuming all items are of the same type
    (type, dim) => {
      // Correctly set dimensions for horizontal layout
      dim.width = width / 3; // Set the width of each item
      dim.height = 200; // Set the height of each item appropriately
    },
  );

  const shouldShowArrow = () => {
    if (parentCategory === 'Recently Played' || subCategories.length === 0) {
      return false;
    }
    return true;
  };

  const rowRenderer = (type, item) => <CategoryCard item={item} parentCategory={parentCategory} />;

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <DividerHeader headerText={parentCategory} shouldShowArrow={shouldShowArrow()} />
      {subCategories.length > 0 && (
        <View
          style={{
            flex: 1,
            minHeight: 200,
          }}
        >
          <RecyclerListView
            layoutProvider={layoutProvider}
            dataProvider={dataProvider}
            rowRenderer={rowRenderer}
            isHorizontal={true}
            scrollViewProps={{
              showsHorizontalScrollIndicator: false,
            }}
            style={{ flex: 1 }}
          />
        </View>
      )}
    </Animated.View>
  );
}
