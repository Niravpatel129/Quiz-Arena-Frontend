import React, { useContext, useState } from 'react';
import { Modal, Text, View } from 'react-native';

const UpdateContext = React.createContext();

const UpdateProvider = ({ children }) => {
  const [updateRequired, setUpdateRequired] = useState(false);

  return (
    <UpdateContext.Provider
      value={{
        updateRequired,
        setUpdateRequired,
      }}
    >
      {updateRequired && (
        <Modal animationType='fade' transparent={true} visible={true}>
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
                    Critical Update Required 🚨
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: 'Inter-Black',
                    color: 'white',
                    marginTop: 30,
                    textAlign: 'center',
                  }}
                >
                  Please update your app to the latest version to continue, if you have any issues
                  please contact support.
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {children}
    </UpdateContext.Provider>
  );
};

const useUpdateContext = () => {
  return useContext(UpdateContext);
};

export { UpdateProvider, useUpdateContext };
