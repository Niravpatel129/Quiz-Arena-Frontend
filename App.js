import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { LogBox, View } from 'react-native';
import Toast from 'react-native-toast-message';
import TabBar from './components/MyTabBar/MyTabBar';
import NotificationBell from './components/NotificationBell/NotificationBell';
import fonts from './config/fonts';
import { AuthProvider } from './context/auth/AuthContext';
import { SocketProvider } from './context/socket/SocketContext';
import { SoundProvider } from './context/sound/SoundContext';
import ProfileEditScreen from './screens';
import Categories2 from './screens/categories2';
import CategoryScreen from './screens/categoryScreen';
import ChallengeScreen from './screens/challenge';
import Chat from './screens/chat';
import Contribute from './screens/contribute';
import CreateProfile from './screens/createProfile';
import FriendsScreen from './screens/friends';
import GameScreen from './screens/game';
import GameOver2 from './screens/game_over2';
import LeaderboardsScreen from './screens/leaderboards';
import Login2 from './screens/login2';
import MatchHistoryScreen from './screens/match_history';
import NotificationsScreen from './screens/notifications';
import PlayersScreen from './screens/players';
import ProfileScreen from './screens/profile';
import PublicProfile from './screens/publicProfile';
import QueueScreen from './screens/queue_screen';
import SignUpLogin from './screens/signuplogin';

// if (Settings) {
//   Settings?.setAppID('1015444866200816');
//   Settings?.initializeSDK();
// }

const prefix = Linking.createURL('/');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [fontsLoaded] = useFonts(fonts);
  console.log('App.js');

  const linking = {
    prefixes: [prefix, 'https://quizarena.gg'],
  };

  // useEffect(() => {
  //   // Log standard event. e.g. completed registration
  //   AppEventsLogger.logEvent(AppEventsLogger.AppEvents.ViewedContent);
  //   AppEventsLogger.logEvent('App Launch');

  //   // add event and send it to facebook
  //   AppEventsLogger.logEvent('added_to_cart', {
  //     content_type: 'product',
  //     content_id: 'HDFU-8452',
  //     currency: 'USD',
  //     value: 142.57,
  //   });
  // }, []);

  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
  }, []);

  if (!fontsLoaded) return null;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#1d284b',
    },
  };

  function HomeTabNavigator() {
    return (
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen
          name='CategoriesHome'
          component={Categories2}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='History'
          component={MatchHistoryScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='Leaderboards'
          component={LeaderboardsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='Friends'
          component={FriendsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  function StackNavigator() {
    return (
      <Stack.Navigator
        options={{
          headerShadowVisible: false,
        }}
        screenOptions={(route) => ({
          headerTitle: 'Quiz Arena',

          cardStyle: { backgroundColor: '#1d284b' },
          tabBarStyle: {},
          headerStyle: {
            backgroundColor: '#1d284b',
            borderBottomWidth: 0,
          },
          headerTitleAlign: 'center',
          headerBackButtonMenuEnabled: false,
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 700,
            display: 'none',
          },

          headerRight: () => {
            if (route.name === 'SignUpLogin') return null;

            return <NotificationBell />;
          },
        })}
      >
        {/* <Stack.Screen name='Dev' component={Contribute} options={{ headerShown: true }} /> */}

        <Stack.Screen
          name='Home'
          component={Login2}
          options={{ title: 'Welcome', headerShown: false }}
        />

        <Stack.Screen
          name='SignUpLogin'
          component={SignUpLogin}
          options={{
            title: 'SignUpLogin',
            headerShown: true,
            headerTransparent: true,
          }}
        />

        <Stack.Screen
          name='CreateProfile'
          component={CreateProfile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='CategoryScreen'
          component={CategoryScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen name='Contribute' component={Contribute} options={{ headerShown: true }} />
        <Stack.Screen
          name='PublicProfile'
          component={PublicProfile}
          options={{ headerShown: true }}
        />

        <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }} />
        {/* <Stack.Screen name='Drawer' component={DrawerNavigator} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name='Queue'
          component={QueueScreen}
          options={{ title: 'Queue', headerShown: false }}
        />
        <Stack.Screen
          name='Game'
          component={GameScreen}
          options={{ title: 'Game', headerShown: false }}
        />

        <Stack.Screen
          name='ProfileEdit'
          component={ProfileEditScreen}
          options={{ title: 'Profile Edit', headerShown: true }}
        />
        <Stack.Screen
          name='GameOver'
          component={GameOver2}
          options={{ title: 'Game Over', headerShown: false }}
        />
        <Stack.Screen
          name='Players'
          component={PlayersScreen}
          options={{ title: 'Players', headerShown: true }}
        />
        <Stack.Screen
          name='Notifications'
          component={NotificationsScreen}
          options={{ title: 'Notifications', headerShown: false }}
        />
        <Stack.Screen
          name='Challenge'
          component={ChallengeScreen}
          options={{ title: 'Challenge', headerShown: true }}
        />
        <Stack.Screen
          name='Categories'
          component={HomeTabNavigator}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <NativeBaseProvider>
        <SocketProvider>
          <NavigationContainer theme={MyTheme} linking={linking}>
            <AuthProvider>
              <SoundProvider>
                <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ flex: 1 }}>
                  <StackNavigator />
                </LinearGradient>
              </SoundProvider>
            </AuthProvider>
            <Toast />
          </NavigationContainer>
        </SocketProvider>
      </NativeBaseProvider>
    </View>
  );
}

export default App;
