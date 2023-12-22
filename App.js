import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './screens/categories';
import GameScreen from './screens/game';
import HomeScreen from './screens/home';
import QueueScreen from './screens/queue';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen
          name='Categories'
          component={CategoriesScreen}
          options={{ title: 'Categories' }}
        />
        <Stack.Screen name='Queue' component={QueueScreen} options={{ title: 'Queue' }} />
        <Stack.Screen name='Game' component={GameScreen} options={{ title: 'Game' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
