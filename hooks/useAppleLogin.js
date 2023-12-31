import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import { useEffect, useState } from 'react';

export const useAppleLogin = () => {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      // Use your Apple login credentials here
    },
    AppleAuthentication.AppleAuthenticationButtonOptions,
  );

  useEffect(() => {
    if (response?.type === 'success') {
      (async () => {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        // Handle the user information as per your app's requirement
        setUser({
          id: credential.user,
          email: credential.email,
          name: credential.fullName?.givenName,
        });
      })();
    }
  }, [response]);

  return { user, request, promptAsync };
};
