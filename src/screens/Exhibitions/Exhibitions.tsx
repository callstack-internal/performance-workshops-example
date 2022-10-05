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
import {ExhibitionsShimmer} from '~components/shimmers';
import {artService} from '~services/artService';
import {colors} from '~utils/colors';
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
type ItemProps = {
  item: any;
  currentMode: 'dark' | 'light';
};

export const Exhibitions = ({}: Props) => {
  const nextExhibitionDate = new Date(2022, 12, 25, 15, 35);
  const [timerLabel, setTimerLabel] = React.useState<string | null>(null);

  const timer = React.useRef<number | undefined>(undefined);
  const currentMode: 'light' | 'dark' = useColorScheme() || 'dark';

  const formatTimeLeft = () => {
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

  const backgroundStyle = {
    backgroundColor: colors[currentMode].background,
  };

  React.useEffect(() => {
    timer.current = setInterval(() => setTimerLabel(formatTimeLeft()), 1000);

    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [formatTimeLeft]);

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
          barStyle={currentMode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Container>
          <Header color={colors[currentMode].text}>Chicago Art Museum</Header>
          <SubHeader color={colors[currentMode].text}>
            Available Exhibitions
          </SubHeader>
          {!!timerLabel && (
            <TimerCaption>{`Time until our next exhibition: \n${timerLabel}`}</TimerCaption>
          )}
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
    </React.Profiler>
  );
};

const Exhibition = ({item, currentMode}: ItemProps) => {
  const onPressLink = () => !!item?.web_url && Linking.openURL(item.web_url);

  return (
    <Item key={item?.id}>
      <ItemTitle color={colors[currentMode].text}>{item?.title}</ItemTitle>
      <ItemDescription color={colors[currentMode].text}>
        {item?.short_description}
      </ItemDescription>
      <ItemImagePlaceholder
        isDark={currentMode === 'dark'}
        source={{uri: item?.image_url}}
      />
      {item?.web_url ? (
        <TouchableOpacity onPress={onPressLink}>
          <ItemLinkButton>See more</ItemLinkButton>
        </TouchableOpacity>
      ) : null}
    </Item>
  );
};
