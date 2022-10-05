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
import {NextExhibitionTimer} from '~components';
import {ExhibitionsShimmer} from '~components/shimmers';
import {artService} from '~services/artService';
import {colors} from '~utils/colors';
import {withProfiler} from '~utils/measure';
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
} from './Exhibitions.styled';

type Props = {};

export const Exhibitions = withProfiler('Tab:Exhibitions', ({}: Props) => {
  const currentMode: 'light' | 'dark' = useColorScheme() || 'dark';
  const isDarkMode = currentMode === 'dark';

  const backgroundStyle = {
    backgroundColor: colors[currentMode].background,
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

  const getExhibitionsArray = () => {
    if (!data?.pages.length) {
      return null;
    }
    const result = data.pages.reduce(
      (acc, curr) => [...acc, ...curr.data.map((el: unknown) => el)],
      [],
    );

    return result;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Container>
        <Header color={colors[currentMode].text}>Chicago Art Museum</Header>
        <SubHeader color={colors[currentMode].text}>
          Available Exhibitions
        </SubHeader>
        <NextExhibitionTimer />
        {getExhibitionsArray() === null ? (
          <ExhibitionsShimmer colorMode={currentMode} />
        ) : (
          <ScrollView onMomentumScrollEnd={handleOnScrollEnd}>
            {getExhibitionsArray()?.map((item: any) => (
              <Item key={item.id}>
                <ItemTitle color={colors[currentMode].text}>
                  {item?.title}
                </ItemTitle>
                <ItemDescription color={colors[currentMode].text}>
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
  );
});
