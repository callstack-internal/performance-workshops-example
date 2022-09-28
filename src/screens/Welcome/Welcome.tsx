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
        <Text
          style={[
            styles.paragraph,
            {color: isDarkMode ? Colors.light : Colors.dark},
          ]}>
          Hello everybody and welcome to our example of a sad and broken app
          that needs help to get back on its feet ;)
        </Text>
        <Text
          style={[
            styles.paragraph,
            {color: isDarkMode ? Colors.light : Colors.dark},
          ]}>
          During our workshops over the next two days, we'll make this app run
          optimally on both current devices as well as those annoying old
          androids ;)
        </Text>
        <Text
          style={[
            styles.paragraph,
            {color: isDarkMode ? Colors.light : Colors.dark},
          ]}>
          We'll use this space to mark our milestones and pass on some
          instructions along each step of the way, so please make sure that your
          setup is running, your coffee is hot and you're ready to go.
        </Text>
        <Text
          style={[
            styles.paragraph,
            {color: isDarkMode ? Colors.light : Colors.dark},
          ]}>
          {'\nEnjoy! \n\nMaciek & Kuba'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    width: '100%',
    paddingTop: 32,
    paddingBottom: 64,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 40,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 48,
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    marginVertical: 8,
    letterSpacing: 0.2,
  },
  highlight: {
    fontWeight: '700',
  },
});
