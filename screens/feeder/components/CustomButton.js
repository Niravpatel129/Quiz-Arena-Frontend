import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useSound } from '../../../context/sound/SoundContext';

const CustomButton = ({
  title,
  onPress,
  children,
  variant = 'alternative',
  isSelected,
  setIsSelected,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const soundContext = useSound();

  const buttonStyles = {
    primary: {
      color: 'white',
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      shadowColor: '#0069d9',
      borderColor: '#0069d9',
    },
    secondary: {
      color: 'white',
      backgroundColor: '#6c757d',
      borderColor: '#6c757d',
      shadowColor: '#5a6268',
      borderColor: '#5a6268',
    },
    danger: {
      color: 'white',
      backgroundColor: '#dc3545',
      borderColor: '#dc3545',
      shadowColor: '#c82333',
      borderColor: '#c82333',
    },
    alternative: {
      color: 'black',
      backgroundColor: isSelected ? '#e0f4ff' : 'white',
      borderColor: isSelected ? '#8cd8ff' : '#e8e6e9',
      shadowColor: isSelected ? '#8cd8ff' : '#e8e6e9',
    },
    default: {
      color: 'white',
      backgroundColor: '#58cc02',
      shadowColor: '#58a700',
      borderColor: '#58a700',
    },
    customPink: {
      color: 'white', // Assuming text color remains white for contrast
      backgroundColor: '#EC80B4',
      borderColor: '#EC80B4',
      shadowColor: '#D66C9E', // A slightly darker shade for the shadow, adjust as necessary
    },
    customBlue: {
      color: 'white', // Assuming text color remains white for contrast
      backgroundColor: '#2978E7',
      borderColor: '#2978E7',
      shadowColor: '#236ABF', // A slightly darker shade for the shadow, adjust as necessary
    },
  };

  // Function to dynamically change button styles based on the variant, isPressed, and isSelected states
  const getButtonStyle = () => {
    const { color, backgroundColor, borderColor, shadowColor } =
      buttonStyles[variant] || buttonStyles['default'];
    return {
      width: '100%',
      padding: 20,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      fontWeight: 'bold',
      borderRadius: 10,
      color,
      backgroundColor,
      borderColor,
      borderWidth: 1,
      elevation: isPressed ? 0 : 2,
      shadowColor,
      shadowOffset: { width: 0, height: isPressed ? 0 : 4 },
      shadowOpacity: 0.8,
      shadowRadius: isPressed ? 0 : 2,
      transform: [{ translateY: isPressed ? 5 : 0 }],
    };
  };

  const buttonStyle = getButtonStyle();

  const handlePress = () => {
    console.log('handlePress');
    if (variant === 'alternative' && setIsSelected) {
      if (!setIsSelected) return;
      setIsSelected(!isSelected);
    }
    if (onPress) {
      soundContext.playSound('keyboard_press');
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
            color: buttonStyles[variant]?.color || 'white',
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
