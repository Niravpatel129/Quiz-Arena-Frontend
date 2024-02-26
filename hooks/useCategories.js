import { useEffect, useState } from 'react';
import { newRequest } from '../api/newRequest';
import useRecentlyPlayed from './useRecentlyPlayed';

// Module-level cache variables
let cachedCategories = null;
let cachedUserData = null;
let isDataFetched = false;

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({});
  const { fetchRecentlyPlayed } = useRecentlyPlayed();

  useEffect(() => {
    const fetchData = async () => {
      let categoriesData = cachedCategories || [];
      let userData = cachedUserData || {};

      if (!isDataFetched) {
        // Fetch categories and user data only if not already fetched
        const res = await newRequest('/homepage/home');
        categoriesData = res.data.categories;
        userData = res.data.user;

        // Cache the fetched data
        cachedCategories = categoriesData;
        cachedUserData = userData;
        isDataFetched = true;
      }

      // Always fetch "Recently Played" to keep it updated
      const previous = await fetchRecentlyPlayed();
      let updatedCategories = [...categoriesData];

      if (previous.length > 0) {
        const recentlyPlayedCategory = {
          parentCategory: 'Recently Played',
          subCategories: previous.map((category) => ({ name: category, image: '' })),
        };

        // Inject "Recently Played" at the beginning or update it if it already exists
        const index = updatedCategories.findIndex((c) => c.parentCategory === 'Recently Played');
        if (index !== -1) {
          updatedCategories[index] = recentlyPlayedCategory;
        } else {
          updatedCategories.unshift(recentlyPlayedCategory);
        }
      }

      // Update state
      setCategories(updatedCategories);
      setUserData(userData);
    };

    fetchData();
  }, []); // The dependency array is kept empty to emulate componentDidMount behavior

  return { categories, userData };
}
