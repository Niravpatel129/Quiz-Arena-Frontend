import { useEffect, useState } from 'react';
import { newRequest } from '../api/newRequest';
import useRecentlyPlayed from './useRecentlyPlayed';

// Module-level cache variables
let cachedCategories = null;
let cachedUserData = null;
let isDataFetched = false;

export default function useCategories() {
  const [categories, setCategories] = useState(cachedCategories || []);
  const [userData, setUserData] = useState(cachedUserData || {});
  const { fetchRecentlyPlayed } = useRecentlyPlayed();

  useEffect(() => {
    if (!isDataFetched) {
      // Check if data has not been fetched yet
      const fetchData = async () => {
        const res = await newRequest('/homepage/home');
        const previous = await fetchRecentlyPlayed();

        if (previous.length > 0) {
          res.data.categories.unshift({
            parentCategory: 'Recently Played',
            subCategories: previous.map((category) => ({ name: category, image: '' })),
          });
        }

        // Update state with fetched data
        setCategories(res.data.categories);
        setUserData(res.data.user);

        // Cache the fetched data
        cachedCategories = res.data.categories;
        cachedUserData = res.data.user;
        isDataFetched = true; // Mark as data fetched
      };

      fetchData();
    }
  }, []);

  return { categories, userData };
}
