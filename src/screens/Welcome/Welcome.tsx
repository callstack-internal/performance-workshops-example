import * as React from 'react';
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Colors, defaultColorMode} from '~utils/colors';

type Props = {};

export const Welcome = ({}: Props) => {
  const currentMode = useColorScheme();
  const isDarkMode = currentMode === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors[currentMode || defaultColorMode],
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.containerStyle}>
        <Text
          style={[
            styles.header,
            {color: isDarkMode ? Colors.light : Colors.dark},
          ]}>
          Welcome
        </Text>
        <Text
          style={[
            styles.subHeader,
            {color: isDarkMode ? Colors.light : Colors.dark},
          ]}>
          CK Performancer Workshops 2022
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    width: '100%',
    padding: 32,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },
  subHeader: {fontSize: 16, textAlign: 'center', marginTop: 24},
  highlight: {
    fontWeight: '700',
  },
});
