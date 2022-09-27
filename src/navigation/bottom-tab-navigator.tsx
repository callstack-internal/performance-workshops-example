import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Welcome} from '~screens/Welcome/Welcome';
import {useColorScheme} from 'react-native';
import {Colors, defaultColorMode} from '~utils/colors';
import {Collections, Exhibitions} from '~screens';

const Tab = createBottomTabNavigator();

const Noop = () => null;

export const BottomTabNavigator = () => {
  const currentMode = useColorScheme();
  const isDarkMode = currentMode === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="Welcome"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: Colors[currentMode || defaultColorMode],
        },
        headerTitleStyle: {color: isDarkMode ? Colors.light : Colors.dark},
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: Colors[currentMode || defaultColorMode],
        },
        tabBarIcon: Noop,
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontWeight: '700',
        },
        tabBarItemStyle: {height: 32},
      })}>
      <Tab.Screen
        name="Welcome"
        component={Welcome}
        options={() => ({header: Noop})}
      />
      <Tab.Screen name="Exhibitions" component={Exhibitions} />
      <Tab.Screen name="Collections" component={Collections} />
    </Tab.Navigator>
  );
};
