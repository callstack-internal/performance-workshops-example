import * as React from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
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
type ItemProps = {
  item: any;
  currentMode: 'dark' | 'light';
};

export const Exhibitions = withProfiler('Tab:Exhibitions', ({}: Props) => {
  const currentMode: 'light' | 'dark' = useColorScheme() || 'dark';

  const barStyle = React.useMemo(
    () => (currentMode === 'dark' ? 'light-content' : 'dark-content'),
    [currentMode],
  );

  const backgroundStyle = React.useMemo(
    () => ({
      backgroundColor: colors[currentMode].background,
    }),
    [currentMode],
  );

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
  }, [data]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={barStyle}
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
          <FlatList
            windowSize={2}
            initialNumToRender={4}
            onEndReachedThreshold={80}
            data={getExhibitionsArray()}
            onEndReached={() => fetchNextPage()}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Exhibition item={item} currentMode={currentMode} />
            )}
          />
        )}
        {isFetchingNextPage ? (
          <LoadingCaption>Loading More Exhibitions...</LoadingCaption>
        ) : null}
      </Container>
    </SafeAreaView>
  );
});

const Exhibition = React.memo(({item, currentMode}: ItemProps) => {
  const onPressLink = React.useCallback(
    () => !!item?.web_url && Linking.openURL(item.web_url),
    [item?.web_url],
  );

  return (
    <Item key={item?.id}>
      <ItemTitle color={colors[currentMode].text}>{item?.title}</ItemTitle>
      <ItemDescription color={colors[currentMode].text}>
        {item?.short_description}
      </ItemDescription>
      <ItemImagePlaceholder
        isDark={currentMode === 'dark'}
        source={{uri: item?.image_url, priority: FastImage.priority.low}}
        resizeMode={FastImage.resizeMode.cover}
      />
      {item?.web_url ? (
        <TouchableOpacity onPress={onPressLink}>
          <ItemLinkButton>See more</ItemLinkButton>
        </TouchableOpacity>
      ) : null}
    </Item>
  );
});
