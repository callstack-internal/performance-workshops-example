import * as React from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {ExhibitionsShimmer} from '~components/shimmers/ExhibitionsShimmer';
import {artService} from '~services/artService';
import {Colors, defaultColorMode} from '~utils/colors';
import {measure} from '~utils/measure';
import {
  Container,
  Header,
  Item,
  ItemDescription,
  ItemImagePlaceholder,
  ItemLinkButton,
  ItemTitle,
  LoadingCaption,
  SubHeader,
  TimerCaption,
} from './Exhibitions.styled';

type Props = {};

export const Exhibitions = ({}: Props) => {
  const nextExhibitionDate = new Date(2022, 12, 25, 15, 35);
  const [timerLabel, setTimerLabel] = React.useState(null);

  const timer = React.useRef<number | undefined>(undefined);
  const currentMode = useColorScheme();
  const isDarkMode = currentMode === 'dark';

  const getTimerLabel = () => {
    const now = new Date();
    const dateDiff = nextExhibitionDate.getTime() - now.getTime();
    const days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}min ${seconds}sec`;
  };

  React.useEffect(() => {
    timer.current = setInterval(() => setTimerLabel(getTimerLabel()), 1000);
  }, [getTimerLabel]);

  const backgroundStyle = {
    backgroundColor: Colors[currentMode || defaultColorMode],
  };

  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery<any>(
    ['artworks', 'collections/exhibitions'],
    ({pageParam = 1}) =>
      artService.fetch('collections/exhibitions', {
        limit: '50',
        page: pageParam,
      }),
    {getNextPageParam: page => page.pagination.current_page + 1},
  );

  const handleOnScrollEnd = (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetTop = evt.nativeEvent.contentOffset.y;
    const contentHeight = evt.nativeEvent.contentSize.height;
    const layoutHeight = evt.nativeEvent.layoutMeasurement.height;
    const shouldRefetch = offsetTop >= contentHeight - layoutHeight - 200;

    if (shouldRefetch) {
      fetchNextPage();
    }
  };

  const getExhibitionsArray = React.useCallback<() => any[] | null>(() => {
    if (!data?.pages.length) {
      return null;
    }
    const result = data.pages.reduce(
      (acc, curr) => [...acc, ...curr.data.map((el: unknown) => el)],
      [],
    );

    return result;
  }, [data?.pages]);

  return (
    <React.Profiler id="Tab:Exhibitions" onRender={measure.onRender}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Container>
          <Header color={isDarkMode ? Colors.light : Colors.dark}>
            Chicago Art Museum
          </Header>
          <SubHeader color={isDarkMode ? Colors.light : Colors.dark}>
            Available Exhibitions
          </SubHeader>
          {!!timerLabel && (
            <TimerCaption>{`Time until our next exhibition: \n${timerLabel}`}</TimerCaption>
          )}
          {getExhibitionsArray() === null ? (
            <ExhibitionsShimmer colorMode={currentMode} />
          ) : (
            <ScrollView onMomentumScrollEnd={handleOnScrollEnd}>
              {getExhibitionsArray()?.map((item: any) => (
                <Item key={item.id}>
                  <ItemTitle color={isDarkMode ? Colors.light : Colors.dark}>
                    {item?.title}
                  </ItemTitle>
                  <ItemDescription
                    color={isDarkMode ? Colors.light : Colors.dark}>
                    {item?.short_description}
                  </ItemDescription>
                  <ItemImagePlaceholder
                    isDark={isDarkMode}
                    source={{uri: item?.image_url}}
                  />
                  {item.web_url ? (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(item.web_url)}>
                      <ItemLinkButton>See more</ItemLinkButton>
                    </TouchableOpacity>
                  ) : null}
                </Item>
              ))}
            </ScrollView>
          )}
          {isFetchingNextPage ? (
            <LoadingCaption>Loading More Exhibitions...</LoadingCaption>
          ) : null}
        </Container>
      </SafeAreaView>
    </React.Profiler>
  );
};
