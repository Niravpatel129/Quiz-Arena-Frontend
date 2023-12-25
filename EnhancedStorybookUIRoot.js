import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import StorybookUIRoot from './.storybook';

// Higher Order Component to wrap StorybookUIRoot with NativeBaseProvider
const withNativeBaseProvider = (Component) => {
  return () => (
    <NavigationContainer>
      <NativeBaseProvider>
        <Component />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

// Wrap StorybookUIRoot with NativeBaseProvider
const EnhancedStorybookUIRoot = withNativeBaseProvider(StorybookUIRoot);

export default EnhancedStorybookUIRoot;
