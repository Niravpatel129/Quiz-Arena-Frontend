const formatLastActive = (dateString, options) => {
  const type = options?.type;

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

  // if (diffInSeconds < secondsInMinute) {
  //   return type === 'short' ? 'now' : 'now';
  // }

  if (diffInSeconds < secondsInMinute) {
    return type === 'short' ? `${diffInSeconds}s` : `${diffInSeconds} secs ago`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return type === 'short' ? `${minutes}m` : `${minutes} mins ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return type === 'short' ? `${hours}h` : `${hours} hours ago`;
  } else if (diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return type === 'short' ? `${days}d` : `${days} days ago`;
  } else if (diffInSeconds < secondsInYear) {
    const months = Math.floor(diffInSeconds / secondsInMonth);
    return type === 'short' ? `${months}mo` : `${months} months ago`;
  } else {
    const years = Math.floor(diffInSeconds / secondsInYear);
    return type === 'short' ? `${years}y` : `${years} years ago`;
  }
};

export default formatLastActive;
