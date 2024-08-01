import React from "react";
import { View, SafeAreaView } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <TriangleColorPicker
        onColorChange={(color) => {
          const { h, s, v } = color;
          setSelectedColor({ h, s, v });
        }}
        style={{ width: 100, height: 100, paddingBottom: 10 }}
        defaultColor={selectedColor}
        hideSliders={true}
      />
    </SafeAreaView>
  );
};

export default ColorPicker;
