import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Answers() {
  const renderButton = () => {
    let isCorrect = null;
    let buttonColor = '#EFF8FF';
    let buttonShadowColor = '#CBD9F0';
    let textColor = '#262625';

    if (isCorrect === false) {
      buttonColor = '#FF5858';
      buttonShadowColor = '#F73535';
      textColor = '#ffffff';
    }

    if (isCorrect === true) {
      buttonColor = '#00C48C';
      buttonShadowColor = '#00C48C';
      textColor = '#ffffff';
    }

    return (
      <TouchableOpacity
        style={{
          backgroundColor: buttonColor,
          width: '100%',
          padding: 20,
          borderRadius: 100,
        }}
      >
        <Text
          style={{
            color: textColor,
            fontFamily: 'poppins-regular',
            fontSize: RFValue(11),
            shadowColor: buttonShadowColor,
            shadowOffset: {
              width: 0,
              height: -6,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          USA
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text
        style={{
          color: '#5E6064',
          fontFamily: 'poppins-regular',
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        Question Answer
      </Text>

      <View
        style={{
          gap: 10,
        }}
      >
        {renderButton()}
        {renderButton()}
        {renderButton()}
        {renderButton()}
      </View>
    </View>
  );
}
