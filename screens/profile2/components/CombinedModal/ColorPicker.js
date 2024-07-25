import React from "react";
import { View, StyleSheet } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  return (
    <View style={styles.container}>
      <TriangleColorPicker
        onColorSelected={(color) => setSelectedColor(color)}
        style={styles.colorPicker}
        defaultColor={selectedColor}
        hideSliders={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  colorPicker: {
    width: 100,
    height: 100,
    paddingBottom: 10,
  },
});

export default ColorPicker;
