import * as React from 'react';
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useQuery} from 'react-query';
import {artService} from '~services/artService';
import {Colors, defaultColorMode} from '~utils/colors';

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
  const {data, isLoading} = useQuery<any>(
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

  /** Simple snippet checking whether data is not being cloned via subsequent query runs */
  // const isDataStable =
  //   !!exhibitions &&
  //   Object.keys(exhibitions).length === data?.pagination?.current_page;

  // console.log('IS DATA STABLE? :: ', isDataStable);

  // if (!isDataStable) {
  //   console.log('IS DATA STABLE? [DEBUG] :: ', {
  //     exhibitionsLength: exhibitions && Object.keys(exhibitions).length,
  //     currentPage: data?.pagination?.current_page,
  //   });
  // }

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

  const renderLoader = React.useCallback(
    () => (isLoading ? <Text>Loading data...</Text> : null),
    [isLoading],
  );

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item?.title}</Text>
        <Text style={styles.itemDescription}>{item?.short_description}</Text>
        <Image
          style={styles.itemImagePlaceholder}
          source={{uri: item?.image_url}}
        />
        {item.web_url ? (
          <TouchableOpacity onPress={() => Linking.openURL(item.web_url)}>
            <Text style={styles.itemLinkButton}>See more</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.containerStyle}>
        <Text
          style={[
            styles.header,
            {color: isDarkMode ? Colors.light : Colors.dark},
          ]}>
          Chicago Art Museum
        </Text>
        <Text
          style={[
            styles.subHeader,
            {color: isDarkMode ? Colors.light : Colors.dark},
          ]}>
          Available Exhibitions
        </Text>
        {renderLoader()}
        <FlatList
          data={getExhibitionsArray()}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          onEndReachedThreshold={1}
          onEndReached={() => setPage(data?.pagination.current_page + 1)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    width: '100%',
    padding: 32,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },
  subHeader: {fontSize: 16, textAlign: 'center', marginTop: 24},
  highlight: {
    fontWeight: '700',
  },
  item: {paddingVertical: 8, paddingHorizontal: 4, marginBottom: 16},
  itemTitle: {color: '#fff'},
  itemDescription: {color: '#fff'},
  itemImagePlaceholder: {
    height: 200,
    width: '100%',
    backgroundColor: '#454545',
  },
  itemLinkButton: {
    color: '#3FFF89',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
