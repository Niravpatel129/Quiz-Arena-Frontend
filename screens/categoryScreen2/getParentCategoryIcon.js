const getParentCategoryIcon = (category) => {
  console.log('🚀  category:', category);

  switch (category.toLowerCase()) {
    case 'general knowledge':
      return 'ios-book';
    case 'games':
      return 'ios-game-controller';
    case 'tv shows':
      return 'ios-desktop';
    case 'anime':
      return 'ios-videocam';
    case 'sports':
      return 'ios-football';
    case 'Science':
      return 'ios-flask';
    case 'indian tv shows':
      return 'ios-desktop';
    default:
      return 'ios-people';
  }
};

export default getParentCategoryIcon;
