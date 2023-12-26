import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import * as RNLocalize from 'react-native-localize';
import TabBar from './components/MyTabBar/MyTabBar';
import fonts from './config/fonts';
import { SocketProvider } from './context/socket/SocketContext';
import CategoriesScreen from './screens/categories';
import ChallengeScreen from './screens/challenge';
import GameScreen from './screens/game';
import GameOverScreen from './screens/game_over';
import HomeScreen from './screens/home';
import LeaderboardsScreen from './screens/leaderboards';
import MatchHistoryScreen from './screens/match_history';
import NotificationsScreen from './screens/notifications';
import PlayersScreen from './screens/players';
import ProfileScreen from './screens/profile';
import QueueScreen from './screens/queue';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [fontsLoaded] = useFonts(fonts);
  const userCountry = RNLocalize.getCountry();
  console.log('🚀  userCountry:', userCountry);

  if (!fontsLoaded) return null;

  function HomeTabNavigator() {
    return (
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1d284b',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          headerRight: () => (
            <>
              <Ionicons
                name='menu'
                size={24}
                color='white'
                style={{ marginRight: 20 }}
                onPress={() => {
                  console.log('🚀 ~ file: App.js ~ line 113 ~ onPress ~ onPress');
                }}
              />
            </>
          ),
        }}
      >
        <Tab.Screen name='Categories' component={CategoriesScreen} options={{}} />
        <Tab.Screen name='History' component={MatchHistoryScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
        <Tab.Screen name='Leaderboards' component={LeaderboardsScreen} />
        <Tab.Screen name='Notifications' component={NotificationsScreen} />
      </Tab.Navigator>
    );
  }

  function StackNavigator() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1d284b',
          },
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen name='Queue' component={QueueScreen} options={{ title: 'Queue' }} />
        <Stack.Screen
          name='Game'
          component={GameScreen}
          options={{ title: 'Game', headerShown: false }}
        />
        <Stack.Screen
          name='GameOver'
          component={GameOverScreen}
          options={{ title: 'Game Over', headerShown: false }}
        />
        <Stack.Screen
          name='Players'
          component={PlayersScreen}
          options={{ title: 'Players', headerShown: true }}
        />
        <Stack.Screen
          name='Challenge'
          component={ChallengeScreen}
          options={{ title: 'Challenge', headerShown: true }}
        />
        <Stack.Screen
          name='Categories'
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NativeBaseProvider>
      <SocketProvider>
        <NavigationContainer>
          {/* <Stack.Screen name='Dev' component={Challange} options={{ headerShown: false }} /> */}
          <StackNavigator />
        </NavigationContainer>
      </SocketProvider>
    </NativeBaseProvider>
  );
}

export default App;
