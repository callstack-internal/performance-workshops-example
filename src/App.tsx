/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

import {BottomTabNavigator} from '~navigation/bottom-tab-navigator';
import {usePredefinedSharedValue} from '~components/shimmers/shimmer-effect-provider/useSharedValue';

const queryClient = new QueryClient();

const App = () => {
  usePredefinedSharedValue();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <BottomTabNavigator />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
