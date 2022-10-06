import * as React from 'react';
import {useColorScheme, SafeAreaView, StatusBar, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQuery} from 'react-query';
import {ArtworksShimmer} from '~components';
import {artService} from '~services/artService';
import {colors} from '~utils/colors';
import {withProfiler} from '~utils/measure';
import {
  Container,
  Header,
  Item,
  ItemDescription,
  ItemImagePlaceholder,
  ItemTitle,
  SubHeader,
} from './Artworks.styled';

type ItemProps = {
  item: any;
  currentMode: 'dark' | 'light';
};

export const Artworks = withProfiler('Tab:Artworks', () => {
  const currentMode: 'light' | 'dark' = useColorScheme() || 'dark';
  const isDarkMode = currentMode === 'dark';

  const backgroundStyle = {
    backgroundColor: colors[currentMode].background,
  };
  const queryOptions = {limit: '50'};
  const {data} = useQuery<any>(
    ['artworks', 'collections/artworks', queryOptions],
    () => artService.fetch('collections/artworks', queryOptions),
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Container>
        <Header color={colors[currentMode].text}>Chicago Art Museum</Header>
        <SubHeader color={colors[currentMode].text}>
          Enjoy some random artpieces from the museum
        </SubHeader>
        {!data ? (
          <ArtworksShimmer colorMode={currentMode} />
        ) : (
          <FlatList
            windowSize={2}
            initialNumToRender={4}
            onEndReachedThreshold={80}
            data={data?.data}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Artwork item={item} currentMode={currentMode} />
            )}
          />
        )}
      </Container>
    </SafeAreaView>
  );
});

const Artwork = ({item, currentMode}: ItemProps) => (
  <Item key={item.id}>
    <ItemTitle color={colors[currentMode].text}>{item?.title}</ItemTitle>
    <ItemDescription color={colors[currentMode].text}>
      {item?.thumbnail?.alt_text}
    </ItemDescription>
    <ItemImagePlaceholder
      isDark={currentMode === 'dark'}
      source={{
        uri: `https://www.artic.edu/iiif/2/${item?.image_id}/full/200,/0/default.jpg`,
        priority: FastImage.priority.low,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  </Item>
);
