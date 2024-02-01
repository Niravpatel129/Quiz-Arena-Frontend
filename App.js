import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Sentry from '@sentry/react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { LogBox, View } from 'react-native';
import Toast from 'react-native-toast-message';
import CustomHeader2 from './components/CustomHeader2/CustomHeader';
import MenuModal from './components/MenuModal/MenuModal';
import TabBar2 from './components/Tabbar2/Tabbar2';
import fonts from './config/fonts';
import { AuthProvider } from './context/auth/AuthContext';
import { MenuProvider } from './context/menu/MenuContext';
import { SocketProvider } from './context/socket/SocketContext';
import { SoundProvider } from './context/sound/SoundContext';
import { TrackingProvider } from './context/tracking/TrackingContext';
import { UpdateProvider } from './context/update/UpdateContext';
import ProfileEditScreen from './screens';
import CategoryScreen2 from './screens/categoryScreen2';
import ChallengeScreen from './screens/challenge';
import Chat from './screens/chat';
import Contribute from './screens/contribute';
import CreateProfile from './screens/createProfile';
import FeederScreen from './screens/feeder';
import FriendsScreen from './screens/friends';
import GameScreen from './screens/game';
import GameOver3 from './screens/gameover3/GameOver3';
import Homepage from './screens/homepage';
import Leaderboards2 from './screens/leaderboards2';
import Login2 from './screens/login2';
import MatchHistory2 from './screens/matchhistory2';
import NotificationsScreen from './screens/notifications';
import PlayersScreen from './screens/players';
import Profile2 from './screens/profile2';
import PublicProfile from './screens/publicProfile';
import QueueScreen2 from './screens/queuescreen2';
import SignUpLogin from './screens/signuplogin';
import SoloPreGame from './screens/soloPreGame';

Sentry.init({
  dsn: 'https://ebea8a70fc3ccc5fe921ee897bf9f2a3@o1363835.ingest.sentry.io/4506592682246144',
  tracesSampleRate: 1.0,
});

SplashScreen.preventAutoHideAsync();

if (true) {
  import('./services/appsFlyer')
    .then((module) => {
      startAppFlyer = module.default;
      startAppFlyer();
    })
    .catch((err) => {
      console.error('Failed to load startAppFlyer', err);
    });
}
const prefix = Linking.createURL('/');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const linking = {
  prefixes: [prefix, 'quizarena.gg', 'https://quizarena.gg'],
  config: {},
  getInitialURL: async () => {
    // Get the initial URL if the app is opened via a deep link
    const url = await Linking.getInitialURL();
    return url;
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }) => {
      // Parse the URL and extract the path and query
      const { path, queryParams } = Linking.parse(url);
      if (path === 'invite') {
        const id = queryParams.id;

        // store into local storage
        if (id) {
          AsyncStorage.setItem('inviteId', id);
        }

        console.log('🚀  id:', id);

        // set it inside params
        listener(id);
      }
    };
    Linking?.addEventListener('url', onReceiveURL);
  },
};

function App() {
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        console.log('Yay! I have user permission to track data');
      } else {
        console.log('Boo! I do not have user permission to track data');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        if (fontsLoaded) await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
        SplashScreen.hideAsync();
      }
    })();
  }, [fontsLoaded]);

  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);

    LogBox.ignoreLogs([
      "export 'TurboModuleRegistry' (imported as 'TurboModuleRegistry') was not found",
    ]);
  }, []);

  if (!fontsLoaded) return null;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  function HomeTabNavigator() {
    return (
      <Tab.Navigator tabBar={(props) => <TabBar2 {...props} />}>
        {/*  <Tab.Navigator tabBar={(props) => <TabBar {...props} />}> */}
        <Tab.Screen
          name='Home'
          component={Homepage}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='History'
          component={MatchHistory2}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Profile2}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='Rankings'
          component={Leaderboards2}
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
        // screenOptions={({ route }) => CustomHeader(route)}
        screenOptions={{
          header: (props) => <CustomHeader2 {...props} />,
        }}
        options={{
          headerShadowVisible: false,
        }}
      >
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
            headerShown: false,
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
          component={CategoryScreen2}
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen name='Contribute' component={Contribute} options={{ headerShown: true }} />
        <Stack.Screen
          name='PublicProfile'
          component={PublicProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }} />
        {/* <Stack.Screen name='Drawer' component={DrawerNavigator} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name='Queue'
          component={QueueScreen2}
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
          component={GameOver3}
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
        <Stack.Screen
          name='Solo'
          component={SoloPreGame}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='Feeder' component={FeederScreen} options={{ headerShown: false }} />
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
              <TrackingProvider>
                <MenuProvider>
                  <SoundProvider>
                    <UpdateProvider>
                      <LinearGradient
                        colors={['#0f0c29', '#302b63', '#24243e']}
                        style={{
                          flex: 1,
                          fontFeatureSettings: "'clig' off, 'liga' off",
                        }}
                      >
                        <MenuModal />
                        <StackNavigator />
                      </LinearGradient>
                    </UpdateProvider>
                  </SoundProvider>
                </MenuProvider>
              </TrackingProvider>
            </AuthProvider>
            <Toast />
          </NavigationContainer>
        </SocketProvider>
      </NativeBaseProvider>
    </View>
  );
}

export default Sentry.wrap(App);
