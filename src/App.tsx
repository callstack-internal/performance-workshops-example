import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

import {BottomTabNavigator} from '~navigation/bottom-tab-navigator';
import {usePredefinedSharedValue} from '~components/shimmers/shimmer-effect-provider/useSharedValue';
import {measure} from '~utils/measure';

const queryClient = new QueryClient();

const App = () => {
  usePredefinedSharedValue();

  return (
    <React.Profiler id="App" onRender={measure.onRender}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <BottomTabNavigator />
        </QueryClientProvider>
      </NavigationContainer>
    </React.Profiler>
  );
};

export default App;
