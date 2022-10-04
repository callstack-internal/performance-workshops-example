import * as React from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useQuery} from 'react-query';
import {ArtworksShimmer} from '~components';
import {artService} from '~services/artService';
import {Colors, defaultColorMode} from '~utils/colors';
import {measure} from '~utils/measure';
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
  const queryOptions = {limit: '50'};
  const {data} = useQuery<any>(
    ['artworks', 'collections/artworks', queryOptions],
    () => artService.fetch('collections/artworks', queryOptions),
  );

  return (
    <React.Profiler id="Tab:Artworks" onRender={measure.onRender}>
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
          {!data ? (
            <ArtworksShimmer colorMode={currentMode} />
          ) : (
            <ScrollView>
              {data?.data?.map((item: any) => (
                <Item key={item.id}>
                  <ItemTitle color={isDarkMode ? Colors.light : Colors.dark}>
                    {item?.title}
                  </ItemTitle>
                  <ItemDescription
                    color={isDarkMode ? Colors.light : Colors.dark}>
                    {item?.thumbnail?.alt_text}
                  </ItemDescription>
                  <ItemImagePlaceholder
                    isDark={isDarkMode}
                    source={{
                      uri: `https://www.artic.edu/iiif/2/${item?.image_id}/full/1680,/0/default.jpg`,
                    }}
                  />
                </Item>
              ))}
            </ScrollView>
          )}
        </Container>
      </SafeAreaView>
    </React.Profiler>
  );
};
