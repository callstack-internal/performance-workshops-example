import * as React from 'react';
import {useColorScheme, SafeAreaView, StatusBar} from 'react-native';

import {Container, Header, Paragraph, SubHeader} from './About.styled';

import {colors} from '~utils/colors';

export const About = () => {
  const currentMode: 'dark' | 'light' = useColorScheme() || 'dark';
  const isDarkMode = currentMode === 'dark';

  const backgroundStyle = {
    backgroundColor: colors[currentMode].background,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Container>
        <Header color={colors[currentMode].text}>Welcome</Header>
        <SubHeader color={colors[currentMode].text}>
          CK Performancer Workshops 2022
        </SubHeader>
        <Paragraph color={colors[currentMode].text}>
          Hello everybody and welcome to our example of a sad and broken app
          that needs help to get back on its feet ;)
        </Paragraph>
        <Paragraph color={colors[currentMode].text}>
          During our workshops over the next two days, we'll make this app run
          optimally on both current devices as well as those annoying old
          androids ;)
        </Paragraph>
        <Paragraph color={colors[currentMode].text}>
          We'll use this space to mark our milestones and pass on some
          instructions along each step of the way, so please make sure that your
          setup is running, your coffee is hot and you're ready to go.
        </Paragraph>
        <Paragraph color={colors[currentMode].text}>
          {'\nEnjoy! \n\nMaciek & Kuba'}
        </Paragraph>
      </Container>
    </SafeAreaView>
  );
};
