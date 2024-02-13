import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import useDynamicFeedbackModal from '../../hooks/useDynamicFeedbackModal';

const FeedbackModal = () => {
  // Use the custom hook to control modal visibility and handle feedback
  const { shouldShowModal, handleFeedback, handleDismiss, question } = useDynamicFeedbackModal();

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={shouldShowModal}
      onRequestClose={() => {
        handleDismiss();
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onStartShouldSetResponder={() => {
          handleDismiss(); // Call handleDismiss when the background is clicked
          return true; // Return true to ensure the touch event is handled
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          onStartShouldSetResponder={() => true} // Prevent the modal from closing when clicking inside it
        >
          <Ionicons
            name='close'
            size={24}
            color='black'
            style={{ position: 'absolute', top: 10, right: 10 }}
            onPress={() => handleFeedback('dismiss')}
          />
          <Text
            style={{
              marginBottom: 15,
              textAlign: 'center',
              fontFamily: 'inter-semiBold',
              fontSize: 22,
            }}
          >
            {question || 'Quiz Arena is adding more categories!'}
          </Text>
          <Text
            style={{
              marginBottom: 15,
              textAlign: 'center',
              fontFamily: 'inter-regular',
              fontSize: 20,
            }}
          >
            How excited are you about this idea?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              width: '100%',
            }}
          >
            {/* Feedback Option Buttons */}
            <TouchableOpacity onPress={() => handleFeedback('angry')}>
              <Text style={{ fontSize: 40 }}>😠</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFeedback('sad')}>
              <Text style={{ fontSize: 40 }}>🙁</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFeedback('neutral')}>
              <Text style={{ fontSize: 40 }}>😐</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFeedback('happy')}>
              <Text style={{ fontSize: 40 }}>🙂</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFeedback('love')}>
              <Text style={{ fontSize: 40 }}>😍</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackModal;
