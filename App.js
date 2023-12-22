import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SocketProvider } from './context/socket/SocketContext';
import CategoriesScreen from './screens/categories';
import GameScreen from './screens/game';
import GameOverScreen from './screens/game_over';
import HomeScreen from './screens/home';
import QueueScreen from './screens/queue';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SocketProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Welcome' }} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
}
