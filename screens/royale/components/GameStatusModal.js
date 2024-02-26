import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const GameStatusModal = ({ visible, status, onClose }) => {
  const getStatusProperties = () => {
    switch (status) {
      case 'won':
        return {
          color: ['#4facfe', '#00f2fe'], // Blue gradient
          message: 'Congratulations! You won!',
          icon: 'trophy',
        };
      case 'eliminated':
        return {
          color: ['#fe5d70', '#fe909d'], // Red gradient
          message: 'Oh no! You have been eliminated.',
          icon: 'sad',
        };
      case 'nextRound':
        return {
          color: ['#42e695', '#3bb2b8'], // Green gradient
          message: 'Great job! Moving on to the next round.',
          icon: 'md-thumbs-up',
        };
      default:
        return {
          color: ['#000', '#000'], // Default case
          message: 'Status unknown',
          icon: 'help-circle-outline',
        };
    }
  };

  const { color, message, icon } = getStatusProperties();

  return (
    <Modal visible={visible} transparent={true} animationType='slide'>
      <LinearGradient colors={color} style={styles.fullScreen}>
        <View style={styles.modalContent}>
          <Ionicons name={icon} size={120} color='white' style={styles.iconStyle} />
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  iconStyle: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default GameStatusModal;
