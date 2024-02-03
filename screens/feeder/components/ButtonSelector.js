import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton'; // Import CustomButton from its file location

const ButtonSelector = () => {
  const [selectedOption, setSelectedOption] = useState(null); // Tracks the currently selected button

  // Function to handle selection
  const handleSelectOption = (option) => {
    setSelectedOption(option); // Update the selected option state
  };

  return (
    <View style={styles.container}>
      {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, index) => (
        <CustomButton
          key={index}
          title={option}
          variant='alternative' // Assuming you want to use the 'alternative' variant for selection
          onPress={() => handleSelectOption(option)}
          isSelected={selectedOption === option} // Pass isSelected prop based on current selection
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around', // This will space out the buttons evenly
    alignItems: 'center',
    padding: 20,
  },
});

export default ButtonSelector;
