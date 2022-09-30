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

export const Exhibitions = ({}: Props) => {
  const currentMode = useColorScheme();
  const isDarkMode = currentMode === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors[currentMode || defaultColorMode],
  };

  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery<any>(
    ['artworks', 'collections/exhibitions'],
    ({pageParam = 1}) =>
      artService.fetch('collections/exhibitions', {
        limit: '10',
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
  );
};
