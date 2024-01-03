import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createContext, useContext, useEffect, useState } from 'react';
import { newRequest } from '../../api/newRequest';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadStoredToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        console.log('🚀  useEffect AuthContext');
        // validate token with backend
        try {
          const tokenRes = await newRequest.get('/auth/validate-token');
          setUserId(tokenRes.data.userId);

          setUserToken(token);

          // dont allow back
          navigation.reset({
            index: 0,
            routes: [{ name: 'Categories' }],
          });
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
    <AuthContext.Provider value={{ userToken, signIn, signOut, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
