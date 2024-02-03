import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

const CustomButton = ({ title, onPress, children, variant = 'alternative' }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // Updated function to dynamically change button styles based on the variant, isPressed, and isSelected states
  const getButtonStyle = (variant, isPressed, isSelected) => {
    const baseStyle = {
      width: '100%',
      padding: 25,
      textTransform: 'uppercase',
      fontFamily: 'sans-serif',
      letterSpacing: 1.5,
      fontWeight: 'bold',
      borderRadius: 10,
      transform: [{ translateY: isPressed ? 5 : 0 }],
    };

    // Adjust styles for selected state
    if (variant === 'alternative' && isSelected) {
      return {
        ...baseStyle,
        color: 'black',
        backgroundColor: '#e0f4ff', // Selected background color
        borderColor: '#8cd8ff', // Adjusted for selected state
        borderWidth: 1,
        elevation: isPressed ? 0 : 2, // Only works on Android
        shadowColor: '#8cd8ff', // Adjusted shadow color for selected state, iOS
        shadowOffset: { width: 0, height: isPressed ? 0 : 2 }, // iOS
        shadowOpacity: 1, // iOS
        shadowRadius: isPressed ? 0 : 1, // iOS
      };
    } else if (variant === 'default') {
      return {
        ...baseStyle,
        color: 'white',
        backgroundColor: '#58cc02',
        elevation: isPressed ? 0 : 2,
        shadowColor: '#58a700',
        shadowOffset: { width: 0, height: isPressed ? 0 : 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
      };
    } else {
      return {
        ...baseStyle,
        color: 'black',
        backgroundColor: isPressed ? 'white' : 'white',
        borderColor: '#e8e6e9',
        borderWidth: 1,
        elevation: isPressed ? 0 : 2,
        shadowColor: '#e8e6e9',
        shadowOffset: { width: 0, height: isPressed ? 0 : 2 },
        shadowOpacity: 1,
        shadowRadius: isPressed ? 0 : 1,
      };
    }
  };

  const buttonStyle = getButtonStyle(variant, isPressed, isSelected);

  const handlePress = () => {
    if (variant === 'alternative') {
      setIsSelected(!isSelected);
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={buttonStyle}
    >
      {children || (
        <Text
          style={{
            color: variant === 'alternative' && isSelected ? 'black' : 'white',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            fontWeight: 'bold',
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
