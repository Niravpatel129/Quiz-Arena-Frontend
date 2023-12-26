import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const theme = {
  colors: {
    primary: '#4DAAFF', // Replace with your color
    background: '#1d284b', // Replace with your color
    text: 'white', // Replace with your color
  },
};

const ICONS = {
  Categories: 'ios-home',
  History: 'calendar',
  Profile: 'ios-person',
  Leaderboards: 'ios-trophy',
  Notifications: 'ios-notifications',
};

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: theme.colors.background }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const iconName = ICONS[route.name] || 'ios-alert';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole='button'
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', padding: 12 }}
          >
            <Ionicons
              name={iconName}
              size={25}
              color={isFocused ? theme.colors.primary : theme.colors.text}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
