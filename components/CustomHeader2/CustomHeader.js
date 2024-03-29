import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useMenuContext } from '../../context/menu/MenuContext';

export default function CustomHeader2(props) {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const overlayHeight = screenHeight * 0.03; // 3% of the screen height
  const { setMenuOpen } = useMenuContext();

  return (
    <View style={{ backgroundColor: '#fff', overflow: 'hidden' }}>
      <LinearGradient
        colors={['#2978E7', '#EC80B4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingBottom: overlayHeight + 20, padding: 10 }}
      >
        <SafeAreaView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: -10,
            }}
          >
            <TouchableOpacity
              onPress={() => setMenuOpen()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image source={require('../../assets/logo.png')} style={{ width: 40, height: 40 }} />
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontFamily: 'poppins-regular',
                  fontSize: 20,
                  marginLeft: 10,
                }}
              >
                Quiz Arena
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.push('ProfileEdit');
                }}
              >
                <Octicons name='gear' size={20} color='white' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Notifications');
                }}
              >
                <Octicons name='bell' size={20} color='white' />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      {/* Custom bottom bar */}
      <View
        style={{
          height: Platform.OS !== 'web' ? 15 : 0,
          backgroundColor: '#fff',
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
          transform: [{ scaleY: -1 }],
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </View>
  );
}
