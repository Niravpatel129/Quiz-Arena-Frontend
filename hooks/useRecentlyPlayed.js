import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const useRecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const fetchRecentlyPlayed = async () => {
    const previouslyPlayed = await AsyncStorage.getItem('recentlyPlayed');
    const previouslyPlayedArray = previouslyPlayed ? JSON.parse(previouslyPlayed) : [];
    const unique = [...new Set(previouslyPlayedArray)].reverse();

    setRecentlyPlayed(unique);
    return unique;
  };

  const addRecentlyPlayedCategory = async (category) => {
    if (recentlyPlayed.includes(category)) return;

    const previouslyPlayed = await AsyncStorage.getItem('recentlyPlayed');
    const previouslyPlayedArray = previouslyPlayed ? JSON.parse(previouslyPlayed) : [];

    // only 5 so remove the oldest one
    if (previouslyPlayedArray.length === 5) {
      previouslyPlayedArray.pop();
    }

    await AsyncStorage.setItem(
      'recentlyPlayed',
      JSON.stringify([...previouslyPlayedArray, category]),
    );

    setRecentlyPlayed([...previouslyPlayedArray, category]);
  };

  return { recentlyPlayed, fetchRecentlyPlayed, addRecentlyPlayedCategory };
};

export default useRecentlyPlayed;
