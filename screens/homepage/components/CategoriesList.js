import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import DividerHeader from './DividerHeader';

export default function CategoriesList() {
  const renderCategoryCard = (index = 1) => {
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
      <TouchableOpacity>
        <LinearGradient
          colors={pickedRandomColor}
          style={{
            width: 120,
            height: 160,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            marginRight: 10,
          }}
        >
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/1200px-Overwatch_circle_logo.svg.png',
            }}
            style={{
              width: 50,
              height: 50,
              zIndex: -3,
            }}
          ></Image>

          <Text
            style={{
              color: '#fff',
              fontFamily: 'poppins-bold',
              fontSize: 16,
              marginTop: 3,
            }}
          >
            Capitals
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <DividerHeader headerText={'Popular Categories'} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5]}
        renderItem={({ index }) => <>{renderCategoryCard(index)}</>}
      />
    </View>
  );
}
