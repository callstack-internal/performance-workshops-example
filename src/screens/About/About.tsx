import * as React from 'react';
import {useColorScheme, SafeAreaView, StatusBar} from 'react-native';
import {Colors, defaultColorMode} from '~utils/colors';
import { measure } from '~utils/measure';
import {Container, Header, Paragraph, SubHeader} from './About.styled';

type Props = {};

export const About = ({}: Props) => {
  const currentMode = useColorScheme();
  const isDarkMode = currentMode === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors[currentMode || defaultColorMode],
  };

  return (
    <React.Profiler id="Tab:About" onRender={measure.onRender}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Container>
          <Header color={isDarkMode ? Colors.light : Colors.dark}>
            Welcome
          </Header>
          <SubHeader color={isDarkMode ? Colors.light : Colors.dark}>
            CK Performancer Workshops 2022
          </SubHeader>
          <Paragraph color={isDarkMode ? Colors.light : Colors.dark}>
            Hello everybody and welcome to our example of a sad and broken app
            that needs help to get back on its feet ;)
          </Paragraph>
          <Paragraph color={isDarkMode ? Colors.light : Colors.dark}>
            During our workshops over the next two days, we'll make this app run
            optimally on both current devices as well as those annoying old
            androids ;)
          </Paragraph>
          <Paragraph color={isDarkMode ? Colors.light : Colors.dark}>
            We'll use this space to mark our milestones and pass on some
            instructions along each step of the way, so please make sure that
            your setup is running, your coffee is hot and you're ready to go.
          </Paragraph>
          <Paragraph color={isDarkMode ? Colors.light : Colors.dark}>
            {'\nEnjoy! \n\nMaciek & Kuba'}
          </Paragraph>
        </Container>
      </SafeAreaView>
    </React.Profiler>
  );
};
