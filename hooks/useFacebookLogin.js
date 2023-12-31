import * as Facebook from 'expo-auth-session/providers/facebook';
import { useEffect, useState } from 'react';

const FB_APP_ID = '1015444866200816';

export const useFacebookLogin = () => {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FB_APP_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      (async () => {
        const accessToken = response.authentication.accessToken;
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`,
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [response]);

  return { user, request, promptAsync };
};
