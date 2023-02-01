import * as React from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking,
} from 'react-native';

import {Container, Divider, Header, Paragraph, SubHeader} from './About.styled';

import {colors} from '~utils/colors';
import {withProfiler} from '~utils/measure';

const Excersises = ({currentMode}: {currentMode: 'dark' | 'light'}) => {
  return (
    <>
      <Divider />

      <Paragraph fontWeight="500" color={colors[currentMode].text}>
        Exercise 1: using React.Profiler component
      </Paragraph>
      <Paragraph color={colors[currentMode].text}>
        {
          '- Wrap Exhibition screen in React.Profiler\n- Capture render durations\n- Output to console'
        }
      </Paragraph>

      <Paragraph
        onPress={() =>
          Linking.openURL(
            'https://github.com/callstack-internal/performance-workshops-example/pull/6/files',
          )
        }
        color={colors[currentMode].link}>
        Reference PR
      </Paragraph>

      <Divider />

      <Paragraph fontWeight="500" color={colors[currentMode].text}>
        Exercise 2: profile the app
      </Paragraph>
      <Paragraph color={colors[currentMode].text}>
        {
          '- connect app to Dev Tools profiler\n- observer rendering patterns\n- what components re-render periodically'
        }
      </Paragraph>

      <Divider />

      <Paragraph fontWeight="500" color={colors[currentMode].text}>
        Exercise 3: improve component structure
      </Paragraph>
      <Paragraph color={colors[currentMode].text}>
        {
          '- Exhibitions countdown is causing whole Exhibitions screen to re-render periodically\n- Extract timer component to reduce scope of re-renders'
        }
      </Paragraph>

      <Paragraph
        onPress={() =>
          Linking.openURL(
            'https://github.com/callstack-internal/performance-workshops-example/pull/15/files',
          )
        }
        color={colors[currentMode].link}>
        Reference PR
      </Paragraph>

      <Divider />

      <Paragraph fontWeight="500" color={colors[currentMode].text}>
        Exercise 4: FlatList
      </Paragraph>
      <Paragraph color={colors[currentMode].text}>
        {
          '- replace ScrollViews with FlatLists\n- use keyExtractor\n-use initialNumToRender\n-windowSize\n-maxToRenderPerBatch'
        }
      </Paragraph>

      <Paragraph
        onPress={() =>
          Linking.openURL(
            'https://github.com/callstack-internal/performance-workshops-example/pull/16/files',
          )
        }
        color={colors[currentMode].link}>
        Reference PR
      </Paragraph>

      <Divider />

      <Paragraph fontWeight="500" color={colors[currentMode].text}>
        Exercise 5: lazy tabs
      </Paragraph>
      <Paragraph color={colors[currentMode].text}>
        {
          '- observe rendering at application startup, at tab change\n- enable lazy loading of tabs\n- observe rendering at startup & at tab change\n- measure the differences'
        }
      </Paragraph>

      <Paragraph
        onPress={() =>
          Linking.openURL(
            'https://github.com/callstack-internal/performance-workshops-example/pull/13/files',
          )
        }
        color={colors[currentMode].link}>
        Reference PR
      </Paragraph>

      <Divider />

      <Paragraph fontWeight="500" color={colors[currentMode].text}>
        Exercise 6: optimize images
      </Paragraph>
      <Paragraph color={colors[currentMode].text}>
        {
          '- observer rendering pattern of images\n- estimate maximal benefits\n- observe effect of using smaller images\n- swap Image for RN FastImage'
        }
      </Paragraph>

      <Paragraph
        onPress={() =>
          Linking.openURL(
            'https://github.com/callstack-internal/performance-workshops-example/pull/12/files',
          )
        }
        color={colors[currentMode].link}>
        Reference PR
      </Paragraph>

      <Divider />

      <Paragraph fontWeight="500" color={colors[currentMode].text}>
        Exercise 7: memoization
      </Paragraph>
      <Paragraph color={colors[currentMode].text}>
        {
          '- Observe repeated re-renders with Profiler\n- Apply React.memo, useMemo and useCallback\n- Observer re-renders after changes\n- Measure improvement'
        }
      </Paragraph>

      <Paragraph
        onPress={() =>
          Linking.openURL(
            'https://github.com/callstack-internal/performance-workshops-example/pull/14/files',
          )
        }
        color={colors[currentMode].link}>
        Reference PR
      </Paragraph>

      <Divider />

      <Paragraph fontWeight="500" color={colors[currentMode].text}>
        Exercise 8: optimize shimmers
      </Paragraph>
      <Paragraph color={colors[currentMode].text}>
        {
          '- Surprisingly common perf issue\n- Observe under renderer\n- SVGs are slow\n- Observer version that implements improvements'
        }
      </Paragraph>

      <Paragraph
        onPress={() =>
          Linking.openURL(
            'https://github.com/callstack-internal/performance-workshops-example/pull/10/files',
          )
        }
        color={colors[currentMode].link}>
        Reference PR
      </Paragraph>

      <Divider />
    </>
  );
};

export const About = withProfiler('Tab:About', () => {
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header color={colors[currentMode].text}>Welcome</Header>
          <SubHeader color={colors[currentMode].text}>
            CK Performance Workshops 2023
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
            instructions along each step of the way, so please make sure that
            your setup is running, your coffee is hot and you're ready to go.
          </Paragraph>

          <Excersises currentMode={currentMode} />

          <Paragraph fontWeight="500" color={colors[currentMode].text}>
            {'\nEnjoy! \n\nMaciek, Kuba & Hur\n\n'}
          </Paragraph>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
});
