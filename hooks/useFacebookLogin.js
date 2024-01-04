import { useNavigation } from '@react-navigation/native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { useEffect, useState } from 'react';

const FB_APP_ID = '1015444866200816';

export const useFacebookLogin = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FB_APP_ID,
  });

  useEffect(() => {
    // Frontend code snippet to send user info and accessToken to backend
    if (response?.type === 'success') {
      (async () => {
        const accessToken = response.authentication.accessToken;
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`,
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);

        // Send userInfo and accessToken to backend
        await axios.post('/auth/facebook', {
          userID: userInfo.id,
          name: userInfo.name,
          profilePicture: userInfo.picture.data.url,
          email: userInfo.email,
          accessToken,
        });

        // Route to categories
        navigation.reset({
          index: 0,
          routes: [{ name: 'Categories' }],
        });
      })();
    }
  }, [response]);

  return { user, request, promptAsync };
};
