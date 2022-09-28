import * as React from 'react';
import styled from 'styled-components/native';
import {ShimmerEffectProvider} from './shimmer-effect-provider';

const shimmerBackground = '#2E2E2E';
const shimmerHighlight = '#454545';

export const ArtworksShimmer = () => {
  const protoArray = [1, 2, 3];

  return (
    <ShimmerEffectProvider
      animate
      backgroundColor={shimmerBackground}
      highlightColor={shimmerHighlight}>
      {protoArray.map(item => (
        <ShimmerContainer key={item}>
          <ShimmerTitle />
          <ShimmerDescription />
          <ShimmerImage />
        </ShimmerContainer>
      ))}
    </ShimmerEffectProvider>
  );
};

const ShimmerContainer = styled.View`
  margin-bottom: 24px;
`;

const ShimmerBase = styled.View`
  background-color: #ffffff;
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
