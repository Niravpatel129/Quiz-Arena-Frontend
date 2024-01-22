import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useMenuContext } from '../../context/menu/MenuContext';

const appVersion = '24';

export default function MenuModal() {
  const { menuOpen, setMenuOpen } = useMenuContext();

  // useEffect(() => {
  //   // get version from backend
  //   const fetchData = async () => {
  //     const res = await newRequest.get(`/homepage/config/${appVersion}`);
  //     console.log('🚀  res:', res);
  //   };

  //   fetchData();
  // }, []);

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={menuOpen}
      onRequestClose={() => {
        setMenuOpen(!menuOpen);
      }}
    >
      <View
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: '#1d284b',
              borderRadius: 7,
              borderWidth: 2,
              borderColor: '#fff',
              padding: 35,
              position: 'relative',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: '80%',
            }}
          >
            <View
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  setMenuOpen(!menuOpen);
                }}
              >
                <Ionicons name='close' size={32} color='white' />
              </Pressable>
            </View>

            <View
              style={{
                position: 'absolute',
                // right: 130,
                // width: 100,
                top: -20,
                // backgroundColor: 'red',
                borderRadius: 8,

                backgroundColor: '#1d284b',
                borderWidth: 2,
                borderColor: '#fff',

                padding: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  fontFamily: 'Inter-Black',
                  color: 'white',
                }}
              >
                Menu
              </Text>
            </View>
            <View
              style={{
                marginBottom: 25,
              }}
            ></View>

            <View
              style={{
                width: '100%',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 10,
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
                onPress={() => {
                  Linking.openURL('https://quizarena.gg/contact');
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: 16,
                    letterSpacing: 1,
                    fontFamily: 'Inter-Black',
                  }}
                >
                  CONTACT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 10,
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
                onPress={() => {
                  Linking.openURL('https://forms.gle/BzCBfyzUw2K6DVUm9');
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: 16,
                    letterSpacing: 1,
                    fontFamily: 'Inter-Black',
                  }}
                >
                  FEEDBACK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 10,
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
                onPress={() => {
                  Linking.openURL('https://quizarena.gg/privacy');
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: 16,
                    letterSpacing: 1,
                    fontFamily: 'Inter-Black',
                  }}
                >
                  PRIVACY
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 10,
                  //   width: '100%',
                }}
              >
                {/* discord icon */}
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://discord.gg/QsEveRTXT9');
                  }}
                >
                  <MaterialCommunityIcons name='discord' size={32} color='#7289da' />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://www.instagram.com/app_quizarena');
                  }}
                >
                  <Ionicons name='logo-instagram' size={32} color='#d62976' />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://www.twitter.com/app_quizarena');
                  }}
                >
                  <Ionicons name='logo-twitter' size={32} color='#1DA1F2' />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'lightgray',
                }}
              >
                Version 1.3.{appVersion}
              </Text>
              <Text
                style={{
                  color: 'gray',
                  marginTop: 5,
                }}
              >
                {/* Date minus 2 days */}
                Released on {new Date(Date.now() - 142800000).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
