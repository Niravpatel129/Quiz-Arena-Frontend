import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ICONS = {
  Categories: 'ios-home',
  History: 'calendar',
  Profile: 'ios-person',
  Rankings: 'ios-trophy',
  Friends: 'ios-people',
};

const TabBar2 = ({ state, descriptors, navigation }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFFFFF',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const iconName = ICONS[route.name] || 'ios-home';

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
              style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 18,
                paddingBottom: 10,
                justifyContent: 'center',
              }}
            >
              <Ionicons
                style={{}}
                name={iconName}
                size={31}
                color={isFocused ? '#938dd7' : '#DEDEDE99'}
              />
              <Text
                style={{
                  color: isFocused ? '#938dd7' : '#DEDEDE99',
                  fontSize: 12,
                  fontFamily: 'Inter-Medium',
                  marginTop: 4,
                }}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default TabBar2;
