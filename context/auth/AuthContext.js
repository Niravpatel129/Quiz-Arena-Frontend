import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createContext, useContext, useEffect, useState } from 'react';
import { newRequest } from '../../api/newRequest';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadStoredToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        console.log('🚀  useEffect AuthContext');
        // validate token with backend
        try {
          const response = await newRequest.get('/auth/validate-token');
          console.log('🚀  response:', response);

          setUserToken(token);
          navigation.navigate('Categories');
        } catch (error) {
          console.log('🚀  token is not valid');
          await AsyncStorage.removeItem('userToken');
        }
      }
    };

    loadStoredToken();
  }, []);

  const signIn = async (newToken) => {
    setUserToken(newToken);
    console.log('🚀  newToken:', newToken);
    await AsyncStorage.setItem('userToken', newToken);
  };

  const signOut = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
