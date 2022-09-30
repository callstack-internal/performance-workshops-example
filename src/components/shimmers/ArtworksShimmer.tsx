import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import styled from 'styled-components/native';
import {shimmerColors} from '~utils/colors';

type Props = {
  colorMode?: ColorSchemeName;
};

export const ArtworksShimmer = ({colorMode}: Props) => {
  const protoArray = [1, 2, 3];

  return (
    <>
      {protoArray.map(item => (
        <ShimmerContainer key={item}>
          <ShimmerTitle
            shimmerColors={[
              shimmerColors[colorMode]?.background,
              shimmerColors[colorMode]?.highlight,
              shimmerColors[colorMode]?.background,
            ]}
          />
          <ShimmerDescription
            shimmerColors={[
              shimmerColors[colorMode]?.background,
              shimmerColors[colorMode]?.highlight,
              shimmerColors[colorMode]?.background,
            ]}
          />
          <ShimmerImage
            shimmerColors={[
              shimmerColors[colorMode]?.background,
              shimmerColors[colorMode]?.highlight,
              shimmerColors[colorMode]?.background,
            ]}
          />
        </ShimmerContainer>
      ))}
    </>
  );
};

const ShimmerContainer = styled.View`
  margin-bottom: 24px;
`;

const ShimmerBase = styled(ShimmerPlaceholder).attrs({
  LinearGradient: LinearGradient,
})`
  border-radius: 4px;
  margin-bottom: 4px;
`;

const ShimmerTitle = styled(ShimmerBase)`
  width: 160px;
  height: 20px;
`;

const ShimmerDescription = styled(ShimmerBase)`
  width: 100%;
  height: 32px;
`;

const ShimmerImage = styled(ShimmerBase)`
  width: 100%;
  height: 160px;
`;
