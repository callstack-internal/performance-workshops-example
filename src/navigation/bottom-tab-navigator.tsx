import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Welcome} from '~screens/Welcome/Welcome';
import {StyleSheet, useColorScheme} from 'react-native';
import {Colors, defaultColorMode} from '~utils/colors';
import {Artworks, Exhibitions} from '~screens';

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
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: isDarkMode ? Colors.light : Colors.dark,
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: Colors[currentMode || defaultColorMode],
        },
        tabBarIcon: Noop,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      })}>
      <Tab.Screen
        name="Welcome"
        component={Welcome}
        options={() => ({header: Noop})}
      />
      <Tab.Screen name="Exhibitions" component={Exhibitions} />
      <Tab.Screen name="Artworks" component={Artworks} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  tabBarItem: {height: 32},
});
