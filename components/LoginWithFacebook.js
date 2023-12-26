import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Button } from 'react-native';

const FB_APP_ID = '1015444866200816';

WebBrowser.maybeCompleteAuthSession();

export default function LoginWithFacebook() {
  const [user, setUser] = React.useState(null);
  console.log('🚀  user:', user);

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FB_APP_ID,
  });

  React.useEffect(() => {
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

  return (
    <Button
      disabled={!request}
      title='Login with Facebook'
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
