import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/auth/AuthContext';

export default function NotificationBell() {
  const navigation = useNavigation();
  const { userNotifications } = useAuth();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Notifications');
      }}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <FontAwesome5 name='bell' size={22} color='white' style={{ marginRight: 10 }} />
      {userNotifications.length > 0 && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 8,
            width: 16,
            height: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 700 }}>
            {userNotifications.length}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
