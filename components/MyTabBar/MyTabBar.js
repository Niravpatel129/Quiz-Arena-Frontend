import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const theme = {
  colors: {
    primary: '#4DAAFF', // Replace with your color
    background: '#1d284b', // Replace with your color
    text: 'white', // Replace with your color
  },
};

const ICONS = {
  Categories: 'ios-tree',
  History: 'calendar',
  Profile: 'ios-person',
  Leaderboards: 'ios-trophy',
  Friends: 'ios-people',
  // Notifications: 'ios-notifications',
};

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        // marginTop: 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.background,
          paddingBottom: 10,
          // paddingTop: 16,
          // paddingTop: 16,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const iconName = ICONS[route.name] || 'book';

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
              style={{ flex: 1, alignItems: 'center', paddingTop: 16 }}
            >
              <Ionicons
                style={{}}
                name={iconName}
                size={30}
                color={isFocused ? 'white' : '#516696'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
