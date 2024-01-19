import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useMenuContext } from '../../context/menu/MenuContext';

export default function NotificationBell() {
  const { setMenuOpen } = useMenuContext();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setMenuOpen(true);
        }}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <FontAwesome5 name='bars' size={22} color='white' style={{ marginRight: 10 }} />
      </TouchableOpacity>
    </>
  );
}
