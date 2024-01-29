import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const useStreak = () => {
  const updateStreak = async () => {
    console.log('updating streak');
    try {
      const streakData = await AsyncStorage.getItem('streak');

      let streak;

      try {
        streak = streakData
          ? JSON.parse(streakData)
          : { streak: 0, date: new Date().toISOString(), toastShown: false };
      } catch (err) {
        streak = { streak: 0, date: new Date().toISOString(), toastShown: false };
      }

      if (!streak) {
        console.log('no streak');
        return;
      }

      const currentDate = new Date();
      const lastStreakDate = new Date(streak.date);

      if (currentDate.toDateString() !== lastStreakDate.toDateString()) {
        streak.toastShown = false;

        if (currentDate - lastStreakDate > 24 * 60 * 60 * 1000) {
          streak.streak = 0;
        }

        streak.streak++;
        streak.date = currentDate.toISOString();
        console.log('🚀  streak:', streak);

        if (streak.streak > 0) {
          await AsyncStorage.setItem('streak', JSON.stringify(streak));
        }
      }

      if (!streak.toastShown) {
        const wittyText = ['You are on a roll!', 'You are on fire!', 'You are a beast!'];
        console.log('showing toast');
        Toast.show({
          position: 'bottom',
          type: 'success',
          text1: 'You have a streak of ' + (streak.streak + 1) + ' days!',
          text2: wittyText[Math.floor(Math.random() * wittyText.length)],
        });

        streak.toastShown = true;
        await AsyncStorage.setItem('streak', JSON.stringify(streak));
      }
    } catch (error) {
      console.error('Error managing streak:', error);
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: 'Error managing streak',
        text2: error,
      });
    }
  };

  return [updateStreak];
};

export default useStreak;
