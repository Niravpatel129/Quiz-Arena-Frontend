import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import StorybookUI from './.storybook';
import { SocketProvider } from './context/socket/SocketContext';
import CategoriesScreen from './screens/categories';
import ChallengeScreen from './screens/challenge';
import GameScreen from './screens/game';
import GameOverScreen from './screens/game_over';
import HomeScreen from './screens/home';
import LeaderboardsScreen from './screens/leaderboards';
import NotificationsScreen from './screens/notifications';
import PlayersScreen from './screens/players';
import QueueScreen from './screens/queue';

const Stack = createNativeStackNavigator();

const SHOW_STORYBOOK = false;

const MainComponent = SHOW_STORYBOOK
  ? StorybookUI
  : function App() {
      return (
        <NativeBaseProvider>
          <SocketProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name='Home'
                  component={HomeScreen}
                  options={{ title: 'Welcome', headerShown: false }}
                />
                <Stack.Screen
                  name='Categories'
                  component={CategoriesScreen}
                  options={{ title: 'Categories' }}
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
                  name='Leaderboards'
                  component={LeaderboardsScreen}
                  options={{ title: 'Leaderboards', headerShown: true }}
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
                  name='Notifications'
                  component={NotificationsScreen}
                  options={{ title: 'Notifications', headerShown: true }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SocketProvider>
        </NativeBaseProvider>
      );
    };

export default MainComponent;
