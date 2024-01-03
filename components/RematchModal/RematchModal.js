import React from 'react';
import { Alert, Image, Modal, Pressable, Text, View } from 'react-native';

const RematchModal = ({
  modalVisible,
  setModalVisible,
  handleRematchAccept,
  handleRematchDecline,
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
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
        >
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Inter-Black',
                color: 'white',
              }}
            >
              Rematch Request
            </Text>
          </View>

          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginBottom: 10,
              borderWidth: 2,
              borderColor: 'white',
            }}
            source={{
              uri: 'https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg',
            }}
          ></Image>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Inter-Regular',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            John wants to play again!
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
              marginTop: 20,
            }}
          >
            <Pressable
              style={{
                backgroundColor: '#53d769',
                borderRadius: 8,
                padding: 10,
                elevation: 2,
                width: 100,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                handleRematchAccept();
                setModalVisible(!modalVisible);
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'Inter-Black',
                }}
              >
                Accept
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#fc3158',
                borderRadius: 8,
                padding: 10,
                elevation: 2,
                width: 100,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                handleRematchDecline();
                setModalVisible(!modalVisible);
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'Inter-Black',
                }}
              >
                Decline
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RematchModal;
