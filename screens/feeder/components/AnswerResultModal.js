import React from "react";
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";

const AnswerResultModal = ({ visible, onContinue }) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <TouchableOpacity
        style={styles.centeredView}
        onPress={onContinue}
        activeOpacity={1}
      >
        {/* No visible modal content, just the touchable background */}
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: to give a dim background
  },
});

export default AnswerResultModal;
