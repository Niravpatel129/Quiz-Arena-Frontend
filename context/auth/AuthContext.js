import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createContext, useContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import Toast from 'react-native-toast-message';
import { newRequest } from '../../api/newRequest';
import socketService from '../../services/socketService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const [userNotifications, setUserNotifications] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState);

  const fetchNotifications = async () => {
    try {
      const response = await newRequest.get('/users/notifications');
      setUserNotifications(response.data?.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  const checkGameInvite = async () => {
    try {
      console.log('checking for game invite');
      AsyncStorage.getItem('inviteId').then((value) => {
        if (value) {
          if (!navigation) return;
          if (!socketService) return;

          Toast.show({
            text1: 'Game Invite',
            text2: `Redirecting to lobby: ${value}!`,
            type: 'info',
            visibilityTime: 3000,
            position: 'bottom',
          });

          navigation.navigate('Challenge', { gameId: value });

          AsyncStorage.removeItem('inviteId');
          return;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        fetchNotifications();
        checkGameInvite();
        validateLogin();
      } else {
        console.log('App has gone to the background!');
      }

      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    fetchNotifications();

    // not hooked up yet
    socketService.on('new-notification', () => {
      fetchNotifications();
    });
  }, [userId]);

  const fetchUser = async () => {
    const userRes = await newRequest.get(`/users/undefined`);

    setUserData(userRes.data);

    return userRes.data;
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, []);

  const validateLogin = async () => {
    try {
      // Fix me
      const tokenRes = await newRequest.get('/auth/validate-token');
      setUserId(tokenRes.data?.userId);
      setUserToken(tokenRes.data?.token);
    } catch (error) {
      console.log('🚀  error:', error);
      await AsyncStorage.removeItem('userToken');
    }
  };

  useEffect(() => {
    const loadStoredToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        try {
          const tokenRes = await newRequest.get('/auth/validate-token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserId(tokenRes.data?.userId);
          setUserToken(token);
        } catch (error) {
          console.log('🚀  error:', error);
          console.log('🚀  token is not valid', token);
          await AsyncStorage.removeItem('userToken');
        }
      }
    };

    loadStoredToken();
  }, []);

  const signIn = async (newToken) => {
    setUserToken(newToken);

    await AsyncStorage.setItem('userToken', newToken);
  };

  const signOut = async () => {
    try {
      await newRequest.post('/auth/logout');

      setUserToken(null);
      await AsyncStorage.removeItem('userToken');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login2' }],
      });
    } catch (err) {
      console.log(err);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login2' }],
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        fetchUser,
        signIn,
        signOut,
        userId,
        userData,
        signOut,
        userNotifications,
        fetchNotifications,
        checkGameInvite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
