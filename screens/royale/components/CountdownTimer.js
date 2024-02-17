import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Convert current time to EST, considering daylight saving time
      const estDiff = -5; // EST is UTC-5
      const edtDiff = -4; // EDT is UTC-4
      // Detect if current date is in daylight saving time for Eastern Time Zone
      const isDst = now.dst();
      const currentDiff = isDst ? edtDiff : estDiff;
      const nowEst = new Date(now.valueOf() + (now.getTimezoneOffset() + currentDiff * 60) * 60000);

      // Find next Tuesday 8PM EST
      let nextTuesday = new Date(nowEst);
      nextTuesday.setDate(nowEst.getDate() + ((2 + (7 - nowEst.getDay())) % 7 || 7)); // Adjust day to next Tuesday
      nextTuesday.setHours(20, 0, 0, 0); // Set time to 8PM

      // If now is after 8PM on Tuesday, set next Tuesday to one week later
      if (nowEst > nextTuesday) {
        nextTuesday.setDate(nextTuesday.getDate() + 7);
      }

      const difference = nextTuesday - nowEst;
      if (difference < 0) {
        setIsVisible(false);
        return;
      }

      // Format time left
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return `${days}:${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Detect if the current date is in DST for North American Eastern Time Zone
  Date.prototype.dst = function () {
    const year = this.getFullYear();
    const secondSundayInMarch = new Date(year, 2, 14);
    secondSundayInMarch.setDate(14 - secondSundayInMarch.getDay());
    const firstSundayInNovember = new Date(year, 10, 7);
    firstSundayInNovember.setDate(7 - firstSundayInNovember.getDay());
    return this >= secondSundayInMarch && this < firstSundayInNovember;
  };

  return isVisible && timeLeft ? (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>Countdown to Event: {timeLeft}</Text>
    </View>
  ) : null;
};

export default CountdownTimer;
