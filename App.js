import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import { TouchableOpacity } from 'react-native';
import TabBar from './components/MyTabBar/MyTabBar';
import fonts from './config/fonts';
import { SocketProvider } from './context/socket/SocketContext';
import CategoriesScreen from './screens/categories';
import ChallengeScreen from './screens/challenge';
import FriendsScreen from './screens/friends';
import GameScreen from './screens/game';
import GameOver2 from './screens/game_over2';
import HomeScreen from './screens/home';
import LeaderboardsScreen from './screens/leaderboards';
import MatchHistoryScreen from './screens/match_history';
import NotificationsScreen from './screens/notifications';
import PlayersScreen from './screens/players';
import ProfileScreen from './screens/profile';
import QueueScreen from './screens/queue_screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

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
          headerLeft: () => {
            // return <Ionicons name='menu' size={24} color='white' style={{ marginLeft: 20 }} />;
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                console.log('🚀 ~ file: App.js ~ line 113 ~ onPress ~ onPress');
              }}
            >
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
          name='Categories'
          component={CategoriesScreen}
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
        screenOptions={{
          headerTitle: 'Quiz Arena',
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

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notifications');
              }}
            >
              <FontAwesome5 name='bell' size={22} color='white' style={{ marginRight: 12 }} />
            </TouchableOpacity>
          ),
        }}
      >
        {/* <Stack.Screen name='Dev' component={QueueScreen} options={{ headerShown: false }} /> */}

        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Welcome', headerShown: false }}
        />
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
          options={{ title: 'Notifications', headerShown: true }}
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
    <NativeBaseProvider>
      <SocketProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SocketProvider>
    </NativeBaseProvider>
  );
}

export default App;
