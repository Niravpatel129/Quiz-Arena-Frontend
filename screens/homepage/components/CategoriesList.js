import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DividerHeader from './DividerHeader';

export default function CategoriesList({ parentCategory, subCategories }) {
  const navigation = useNavigation();

  const renderCategoryCard = ({ item, index = 1 }) => {
    console.log('🚀  item:', item);
    // color options for linear gradient
    const colorOptions = {
      blue: ['#FF8F3B', '#FF4646'],
      red: ['#A9CDF4', '#3F95F2'],
      green: ['#CCB6FF', '#9769FF'],
      yellow: ['#00AFB9', '#A4FAFF'],
    };

    // pick a color based on index in order keep going through the color options
    const pickedRandomColor = Object.values(colorOptions)[index % 4];

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CategoryScreen', {
            categoryId: item.name.split(' ').join('-'),
            categoryName: item.name,
            parentCategory: parentCategory,
            categoryImage: '',
          });
        }}
      >
        <LinearGradient
          colors={pickedRandomColor}
          style={{
            width: 120,
            height: 160,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 16,
            marginRight: 10,
            padding: 2,
          }}
        >
          <Image
            source={{
              uri:
                item.logo ||
                'https://cdn.discordapp.com/attachments/1198039556696571934/1200954944623231026/val_logo.png?ex=65c80f73&is=65b59a73&hm=985240294e0257c5ec347099cff49df0d4af15a01271734e030b3da10d1390c3&',
            }}
            style={{
              width: 50,
              height: 50,
              zIndex: -3,
            }}
          ></Image>

          <Text
            numberOfLines={2}
            ellipsizeMode='tail'
            style={{
              color: '#fff',
              fontFamily: 'poppins-bold',
              fontSize: RFValue(12),
              marginTop: 3,
              textTransform: 'capitalize',
              textAlign: 'center',
              height: 50,

              // make ... after 2 lines
            }}
          >
            {item.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <DividerHeader headerText={parentCategory} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={subCategories}
        renderItem={({ item, index }) => <>{renderCategoryCard({ item: item, index: index })}</>}
      />
    </View>
  );
}
