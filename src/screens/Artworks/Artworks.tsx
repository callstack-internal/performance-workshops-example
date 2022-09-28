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
} from 'react-native';
import {useQuery} from 'react-query';
import {artService} from '~services/artService';
import {Colors, defaultColorMode} from '~utils/colors';

type Props = {};

export const Artworks = ({}: Props) => {
  const currentMode = useColorScheme();
  const isDarkMode = currentMode === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors[currentMode || defaultColorMode],
  };
  const queryOptions = {limit: '15'};
  const {data, isLoading} = useQuery<any>(
    ['artworks', 'collections/artworks', queryOptions],
    () => artService.fetch('collections/artworks', queryOptions),
  );

  const renderLoader = React.useCallback(
    () =>
      isLoading ? <Text style={styles.loader}>Loading data...</Text> : null,
    [isLoading],
  );

  const renderItem = ({item}: {item: any}) => {
    const uri = `https://www.artic.edu/iiif/2/${item?.image_id}/full/400,/0/default.jpg`;
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item?.title}</Text>
        <Text style={styles.itemDescription}>{item?.thumbnail?.alt_text}</Text>
        <Image style={styles.itemImagePlaceholder} source={{uri}} />
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
          Available Artpieces
        </Text>
        <FlatList data={data?.data} renderItem={renderItem} />
        {renderLoader()}
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
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  highlight: {
    fontWeight: '700',
  },
  loader: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#F85555',
  },
  item: {paddingVertical: 8, paddingHorizontal: 4, marginBottom: 16},
  itemTitle: {color: '#fff', paddingBottom: 4},
  itemDescription: {color: '#fff', paddingBottom: 16},
  itemImagePlaceholder: {
    height: 200,
    width: '100%',
    backgroundColor: '#454545',
  },
});
