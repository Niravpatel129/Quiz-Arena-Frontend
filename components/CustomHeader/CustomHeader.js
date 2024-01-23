import React from 'react';
import MenuButton from '../MenuButton/MenuButton';
import NotificationBell from '../NotificationBell/NotificationBell';

const CustomHeader = (route) => {
  const headerStyle = {
    backgroundColor: '#1d284b',
    borderBottomWidth: 0,
  };

  const headerTitleStyle = {
    color: 'white',
    fontWeight: 'bold',
    display: 'none',
  };

  return {
    headerTitle: 'Quiz Arena',
    cardStyle: { backgroundColor: '#1d284b' },
    tabBarStyle: {},
    headerStyle,
    headerTitleAlign: 'center',
    headerBackButtonMenuEnabled: false,
    headerTintColor: 'white',
    headerTitleStyle,
    headerRight: () => {
      if (route.name === 'SignUpLogin') return null;
      return <NotificationBell />;
    },
    headerLeft: () => {
      if (route.name === 'SignUpLogin') return null;
      return <MenuButton />;
    },
  };
};

export default CustomHeader;
