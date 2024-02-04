import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

const CustomButton = ({
  title,
  onPress,
  children,
  variant = 'alternative',
  isSelected,
  setIsSelected,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Updated function to dynamically change button styles based on the variant, isPressed, and isSelected states
  const getButtonStyle = (variant, isPressed, isSelected) => {
    const baseStyle = {
      width: '100%',
      padding: 20,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      fontWeight: 'bold',
      borderRadius: 10,
      transform: [{ translateY: isPressed ? 5 : 0 }],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          color: 'white',
          backgroundColor: '#007bff',
          borderColor: '#007bff',
          borderWidth: 1,
          elevation: isPressed ? 0 : 2,
          shadowColor: '#0069d9',
          shadowOffset: { width: 0, height: isPressed ? 0 : 4 },
          shadowOpacity: 0.8,
          shadowRadius: isPressed ? 0 : 2,
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: 'white',
          backgroundColor: '#6c757d',
          borderColor: '#6c757d',
          borderWidth: 1,
          elevation: isPressed ? 0 : 2,
          shadowColor: '#5a6268',
          shadowOffset: { width: 0, height: isPressed ? 0 : 4 },
          shadowOpacity: 0.8,
          shadowRadius: isPressed ? 0 : 2,
        };
      case 'danger':
        return {
          ...baseStyle,
          color: 'white',
          backgroundColor: '#dc3545',
          borderColor: '#dc3545',
          borderWidth: 1,
          elevation: isPressed ? 0 : 2,
          shadowColor: '#c82333',
          shadowOffset: { width: 0, height: isPressed ? 0 : 4 },
          shadowOpacity: 0.8,
          shadowRadius: isPressed ? 0 : 2,
        };
      case 'alternative':
        return isSelected
          ? {
              ...baseStyle,
              color: 'black',
              backgroundColor: '#e0f4ff',
              borderColor: '#8cd8ff',
              borderWidth: 1,
              elevation: isPressed ? 0 : 2,
              shadowColor: '#8cd8ff',
              shadowOffset: { width: 0, height: isPressed ? 0 : 2 },
              shadowOpacity: 1,
              shadowRadius: isPressed ? 0 : 1,
            }
          : {
              ...baseStyle,
              color: 'black',
              backgroundColor: 'white',
              borderColor: '#e8e6e9',
              borderWidth: 1,
              elevation: isPressed ? 0 : 2,
              shadowColor: '#e8e6e9',
              shadowOffset: { width: 0, height: isPressed ? 0 : 2 },
              shadowOpacity: 1,
              shadowRadius: isPressed ? 0 : 1,
            };
      case 'default':
      default:
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
    }
  };

  const buttonStyle = getButtonStyle(variant, isPressed, isSelected);

  const handlePress = () => {
    if (variant === 'alternative') {
      if (!setIsSelected) return;
      setIsSelected(!isSelected);
    }
    if (onPress) {
      console.log('onPress');
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
