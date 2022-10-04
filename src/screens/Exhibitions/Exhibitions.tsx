import * as React from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
  FlatList,
} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {NextExhibitionTimer} from '~components';
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
} from './Exhibitions.styled';

type Props = {};
type ItemProps = {
  item: any;
  isDarkMode: boolean;
};

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
          <NextExhibitionTimer />
          {getExhibitionsArray() === null ? (
            <ExhibitionsShimmer colorMode={currentMode} />
          ) : (
            <FlatList
              windowSize={2}
              initialNumToRender={4}
              onEndReachedThreshold={80}
              data={getExhibitionsArray()}
              onEndReached={() => fetchNextPage()}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Exhibition item={item} isDarkMode={isDarkMode} />
              )}
            />
          )}
          {isFetchingNextPage ? (
            <LoadingCaption>Loading More Exhibitions...</LoadingCaption>
          ) : null}
        </Container>
      </SafeAreaView>
    </React.Profiler>
  );
};

const Exhibition = React.memo(({item, isDarkMode}: ItemProps) => {
  const onPressLink = () => !!item?.web_url && Linking.openURL(item.web_url);

  return (
    <Item key={item?.id}>
      <ItemTitle color={isDarkMode ? Colors.light : Colors.dark}>
        {item?.title}
      </ItemTitle>
      <ItemDescription color={isDarkMode ? Colors.light : Colors.dark}>
        {item?.short_description}
      </ItemDescription>
      <ItemImagePlaceholder
        isDark={isDarkMode}
        source={{uri: item?.image_url}}
      />
      {item?.web_url ? (
        <TouchableOpacity onPress={onPressLink}>
          <ItemLinkButton>See more</ItemLinkButton>
        </TouchableOpacity>
      ) : null}
    </Item>
  );
});
