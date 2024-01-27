import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { newRequest } from '../../api/newRequest';
import CategoriesList from './components/CategoriesList';
import UserProfile from './components/UserProfile';

export default function Homepage() {
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await newRequest('/homepage/home');
      setCategories(res.data.categories);
      setUserData(res.data.user);
    };

    fetchData();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          padding: 10,
          backgroundColor: '#fff',
          height: '100%',
          gap: 20,
        }}
      >
        <UserProfile userData={userData} />
        {categories.map((category, index) => {
          return (
            <CategoriesList
              key={index}
              parentCategory={category.parentCategory}
              subCategories={category.subCategories}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
