import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { LogBox, TouchableOpacity, View } from 'react-native';
import TabBar from './components/MyTabBar/MyTabBar';
import fonts from './config/fonts';
import { AuthProvider } from './context/auth/AuthContext';
import { SocketProvider } from './context/socket/SocketContext';
import ProfileEditScreen from './screens';
import Categories2 from './screens/categories2';
import ChallengeScreen from './screens/challenge';
import Chat from './screens/chat';
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
import QueueScreen from './screens/queue_screen';
import SignUpLogin from './screens/signuplogin';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [fontsLoaded] = useFonts(fonts);

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
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0,
          },
          tabBarHideOnKeyboard: true,
          headerStyle: {
            borderBottomWidth: 0,

            backgroundColor: '#1d284b',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          cardStyle: { backgroundColor: '#1d284b' },

          headerLeft: () => {
            // return <Ionicons name='menu' size={24} color='white' style={{ marginLeft: 20 }} />;
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome5
                name='user-friends'
                size={22}
                color='white'
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      >
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
    const navigation = useNavigation();

    return (
      <Stack.Navigator
        screenOptions={(route) => ({
          headerTitle: 'Quiz Arena',
          cardStyle: { backgroundColor: '#1d284b' },
          tabBarStyle: {
            // borderTopWidth: 0,
          },
          headerStyle: {
            backgroundColor: '#1d284b',
            borderBottomWidth: 0,
          },
          headerTitleAlign: 'center',
          headerBackButtonMenuEnabled: false,
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            display: 'none',
          },

          headerRight: () => {
            if (route.name === 'SignUpLogin') return null;

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Notifications');
                }}
              >
                <FontAwesome5 name='bell' size={22} color='white' style={{ marginRight: 10 }} />
              </TouchableOpacity>
            );
          },
        })}
      >
        {/* <Stack.Screen
          name='Dev'
          component={CreateProfile}
          options={{ headerShown: false, headerTransparent: true }}
        /> */}

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
            headerTranslucent: true,
          }}
        />

        <Stack.Screen
          name='CreateProfile'
          component={CreateProfile}
          options={{
            headerShown: false,
          }}
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
          options={{ headerShown: true, headerTransparent: true }}
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
          <NavigationContainer theme={MyTheme}>
            <AuthProvider>
              <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={{ flex: 1 }}>
                <StackNavigator />
              </LinearGradient>
            </AuthProvider>
          </NavigationContainer>
        </SocketProvider>
      </NativeBaseProvider>
    </View>
  );
}

export default App;
