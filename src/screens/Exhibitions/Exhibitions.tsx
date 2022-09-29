import * as React from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useQuery} from 'react-query';
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
  SubHeader,
} from './Exhibitions.styled';

type Props = {};

export const Exhibitions = ({}: Props) => {
  const [currentPage, setPage] = React.useState(1);
  const [exhibitions, setExhibitions] = React.useState<{
    [key: string]: any[];
  } | null>(null);
  const currentMode = useColorScheme();
  const isDarkMode = currentMode === 'dark';
  const queryOptions = {limit: '10', page: currentPage.toString()};

  const backgroundStyle = {
    backgroundColor: Colors[currentMode || defaultColorMode],
  };
  const {data} = useQuery<any>(
    ['artworks', 'collections/exhibitions', queryOptions],
    () => artService.fetch('collections/exhibitions', queryOptions),
    {
      onSuccess: res => {
        const resPage = res.pagination?.current_page;
        const resData = res.data;

        if (exhibitions?.[resPage]?.length) {
          return;
        }

        if (!!resPage && !!resData) {
          const toSet = {
            ...exhibitions,
            [resPage]: resData,
          };

          setExhibitions(toSet);
        }
      },
    },
  );

  const getExhibitionsArray = React.useCallback<() => any[]>(() => {
    if (exhibitions === null) {
      return [];
    }

    const exhibitionsKeys = Object.keys(exhibitions);
    let result: any[] = [];

    for (const key of exhibitionsKeys) {
      result = [...result, ...exhibitions[key]];
    }

    return result;
  }, [exhibitions]);

  const renderItem = ({item}: {item: any}) => {
    return (
      <Item>
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
        {item.web_url ? (
          <TouchableOpacity onPress={() => Linking.openURL(item.web_url)}>
            <ItemLinkButton>See more</ItemLinkButton>
          </TouchableOpacity>
        ) : null}
      </Item>
    );
  };

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
        {!getExhibitionsArray() ? (
          <ExhibitionsShimmer />
        ) : (
          <FlatList
            data={getExhibitionsArray()}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            onEndReachedThreshold={1}
            onEndReached={() => setPage(data?.pagination.current_page + 1)}
          />
        )}
      </Container>
    </SafeAreaView>
  );
};
