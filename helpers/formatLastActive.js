const formatLastActive = (dateString) => {
  console.log('🚀  dateString:', dateString);
  // Parse the date string to a Date object
  const date = new Date(dateString);
  if (isNaN(date)) {
    return 'Invalid date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000;
  const secondsInYear = 31536000;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} secs ago`;
  } else if (diffInSeconds < secondsInHour) {
    return `${Math.floor(diffInSeconds / secondsInMinute)} mins ago`;
  } else if (diffInSeconds < secondsInDay) {
    return `${Math.floor(diffInSeconds / secondsInHour)} hours ago`;
  } else if (diffInSeconds < secondsInMonth) {
    return `${Math.floor(diffInSeconds / secondsInDay)} days ago`;
  } else if (diffInSeconds < secondsInYear) {
    return `${Math.floor(diffInSeconds / secondsInMonth)} months ago`;
  } else {
    return `${Math.floor(diffInSeconds / secondsInYear)} years ago`;
  }
};

export default formatLastActive;
