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
  const [exhibitions, setExhibitions] = React.useState<any[]>([]);
  const currentMode = useColorScheme();
  const isDarkMode = currentMode === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors[currentMode || defaultColorMode],
  };
  const queryOptions = {limit: '10', page: currentPage.toString()};
  const {data, isLoading} = useQuery<any>(
    ['artworks', 'collections/exhibitions', queryOptions],
    () => artService.fetch('collections/exhibitions', queryOptions),
    {onSuccess: res => setExhibitions([...exhibitions, ...res.data])},
  );

  const renderLoader = React.useCallback(
    () => (isLoading ? <Text>Loading data...</Text> : null),
    [isLoading],
  );

  const renderItem = ({item}: {item: any}) => {
    return (
      <View
        style={{paddingVertical: 8, paddingHorizontal: 4, marginBottom: 16}}>
        <Text style={{color: '#fff'}}>{item?.title}</Text>
        <Text style={{color: '#fff'}}>{item?.short_description}</Text>
        <Image
          style={{height: 200, width: '100%', backgroundColor: '#454545'}}
          source={{uri: item?.image_url}}
        />
        {item.web_url ? (
          <TouchableOpacity onPress={() => Linking.openURL(item.web_url)}>
            <Text
              style={{
                color: '#3FFF89',
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontWeight: '700',
                textDecorationLine: 'underline',
              }}>
              See more
            </Text>
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
          data={exhibitions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
});
