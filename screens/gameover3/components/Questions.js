import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Questions() {
  const renderQuestion = () => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: '#E3E3E3',
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: '#181A17',
            textAlign: 'center',
            fontFamily: 'poppins-semiBold',
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          Lorem ipsum dolor sit amet consectetur. In id nec mauris libero mattis vel malesuada nunc.
        </Text>
        <View
          style={{
            width: '100%',
            gap: 12,
          }}
        >
          {renderQuestionItem()}
          {renderQuestionItem()}
          {renderQuestionItem()}
          {renderQuestionItem()}
        </View>

        <View
          style={{
            width: '100%',
          }}
        >
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#E3E3E3',
              marginVertical: 20,
            }}
          ></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#2CC672',
                paddingVertical: 8,
                paddingHorizontal: 22,
              }}
            >
              <Ionicons name='thumbs-up-sharp' size={24} color='#2CC672' />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#FF5858',
                paddingVertical: 8,
                borderRadius: 10,
                paddingHorizontal: 22,
              }}
            >
              <Ionicons name='thumbs-down-sharp' size={24} color='#FF5858' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderQuestionItem = () => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5,
          borderWidth: 1,
          borderColor: '#D5D5E0',
          borderRadius: 10,
          paddingVertical: 12,
        }}
      >
        <View>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5U8rFMfG5yemq64zE-CvmXIXU6Iozboavd70aWDFtUw&s',
            }}
            style={{
              width: 30,
              height: 30,
              borderWidth: 1,
              borderColor: '#EC80B4',
              borderRadius: 100,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'poppins-regular',
              fontSize: 14,
              color: '#262625',
            }}
          >
            Answer Key 1
          </Text>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5U8rFMfG5yemq64zE-CvmXIXU6Iozboavd70aWDFtUw&s',
            }}
            style={{
              width: 30,
              height: 30,
              borderWidth: 1,
              borderColor: '#EC80B4',
              borderRadius: 100,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        gap: 10,
      }}
    >
      {renderQuestion()}
      {renderQuestion()}
      {renderQuestion()}
      {renderQuestion()}
      {renderQuestion()}
      {renderQuestion()}
    </View>
  );
}
