import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

import {BottomTabNavigator} from '~navigation/bottom-tab-navigator';
import {usePredefinedSharedValue} from '~components/shimmers/shimmer-effect-provider/useSharedValue';
import {withProfiler} from '~utils/measure';

const queryClient = new QueryClient();

const App = withProfiler('App', () => {
  usePredefinedSharedValue();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <BottomTabNavigator />
      </QueryClientProvider>
    </NavigationContainer>
  );
});

export default App;
