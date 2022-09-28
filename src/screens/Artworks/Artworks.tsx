import * as React from 'react';
import {useColorScheme, SafeAreaView, StatusBar, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import {ArtworksShimmer} from '~components';
import {artService} from '~services/artService';
import {Colors, defaultColorMode} from '~utils/colors';
import {
  Container,
  Header,
  Item,
  ItemDescription,
  ItemImagePlaceholder,
  ItemTitle,
  SubHeader,
} from './Artworks.styled';

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

  const renderItem = ({item}: {item: any}) => {
    const uri = `https://www.artic.edu/iiif/2/${item?.image_id}/full/400,/0/default.jpg`;
    return (
      <Item>
        <ItemTitle>{item?.title}</ItemTitle>
        <ItemDescription>{item?.thumbnail?.alt_text}</ItemDescription>
        <ItemImagePlaceholder source={{uri}} />
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
          Enjoy some random artpieces from the museum
        </SubHeader>
        {isLoading ? (
          <ArtworksShimmer />
        ) : (
          <FlatList data={data?.data} renderItem={renderItem} />
        )}
      </Container>
    </SafeAreaView>
  );
};
