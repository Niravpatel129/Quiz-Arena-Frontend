import { useEffect, useState } from 'react';
import { newRequest } from '../api/newRequest';
import useRecentlyPlayed from './useRecentlyPlayed';

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({});
  const { fetchRecentlyPlayed } = useRecentlyPlayed();

  useEffect(() => {
    const fetchData = async () => {
      const res = await newRequest('/homepage/home');
      const previous = await fetchRecentlyPlayed();

      if (previous.length > 0) {
        res.data.categories.unshift({
          parentCategory: 'Recently Played',
          subCategories: previous.map((category) => ({ name: category, image: '' })),
        });
      }

      res.data.categories = res.data.categories.slice(0, 7);

      setCategories(res.data.categories);
      setUserData(res.data.user);
    };

    fetchData();
  }, []);

  return { categories, userData };
}
