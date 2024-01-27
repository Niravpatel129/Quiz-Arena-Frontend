import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AgainButtons({ opponentId, categoryName, handleRematch }) {
  const navigation = useNavigation();

  const ShareButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Categories');
        }}
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
          paddingVertical: 12,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 50,
          borderWidth: 1,
          borderColor: '#CFCFCF',
        }}
      >
        <Ionicons name='home' size={24} color='#E15393' />
      </TouchableOpacity>
    );
  };

  const ChatButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat', {
            chattingWithId: opponentId,
          });
        }}
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
          paddingVertical: 12,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 50,
          borderWidth: 1,
          borderColor: '#CFCFCF',
        }}
      >
        <Ionicons name='chatbox' size={24} color='#E15393' />
      </TouchableOpacity>
    );
  };

  const RematchButton = () => {
    return (
      <TouchableOpacity
        onPress={handleRematch}
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
          flexDirection: 'row',
          gap: 5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: '#E15393',
        }}
      >
        <Ionicons name='refresh-outline' size={24} color='white' />
        <Text
          style={{
            fontFamily: 'poppins-semiBold',
            color: 'white',
          }}
        >
          Rematch
        </Text>
      </TouchableOpacity>
    );
  };

  const playAgainButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Queue', {
            categoryId: categoryName.split(' ').join('-'),
            categoryName: categoryName,
          });
        }}
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
          flexDirection: 'row',
          gap: 5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: '#3F95F2',
        }}
      >
        <Ionicons name='play' size={24} color='white' />
        <Text
          style={{
            fontFamily: 'poppins-semiBold',
            color: 'white',
          }}
        >
          Play Again
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CFCFCF',
        }}
      ></View>
      <View
        style={{
          paddingVertical: 20,
          flexDirection: 'row',
          gap: 5,
          width: '100%',
        }}
      >
        <View>{ShareButton()}</View>
        <View>{ChatButton()}</View>
        <View
          style={{
            flex: 2,
          }}
        >
          {RematchButton()}
        </View>
        <View
          style={{
            flex: 2,
          }}
        >
          {playAgainButton()}
        </View>
      </View>
    </View>
  );
}
