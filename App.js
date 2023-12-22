import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import CategoriesScreen from './screens/categories';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
