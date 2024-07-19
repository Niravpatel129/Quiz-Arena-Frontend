// BottomModal.js
import React from "react";
import { Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

const BottomModal = ({ isVisible, onClose, onSelectMode }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalView}>
          <Text style={styles.modalTitle}>Choose Mode</Text>
          <TouchableOpacity onPress={() => onSelectMode("1v1")}>
            <LinearGradient
              colors={["#EC80B4", "#3F95F2"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Live 1v1</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectMode("solo")}>
            <LinearGradient
              colors={["#FF8F3B", "#FF4646"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={styles.button}
            >
              <Text style={styles.textStyle}>Solo Mode</Text>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontWeight: "600",
    marginBottom: 20,
    fontFamily: "poppins-bold",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 180,
    marginVertical: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "poppins-bold",
  },
});

export default BottomModal;
