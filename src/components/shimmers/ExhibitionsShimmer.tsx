import * as React from 'react';
import styled from 'styled-components/native';

import {colors} from '~utils/colors';
import {ShimmerEffectProvider} from './shimmer-effect-provider';

type Props = {
  colorMode: 'dark' | 'light';
};

const protoArray = [1, 2, 3];

export const ExhibitionsShimmer = React.memo(({colorMode}: Props) => (
  <ShimmerEffectProvider
    highlightColor={colors[colorMode]?.shimmer_highlight}
    backgroundColor={colors[colorMode]?.shimmer_background}>
    {protoArray.map(item => (
      <ShimmerContainer key={item}>
        <ShimmerTitle />
        <ShimmerDescription />
        <ShimmerImage />
        <ShimmerLinkButton />
      </ShimmerContainer>
    ))}
  </ShimmerEffectProvider>
));

const ShimmerContainer = styled.View`
  margin-bottom: 24px;
`;

const ShimmerBase = styled.View`
  border-radius: 4px;
  margin-bottom: 4px;
  background: #fff;
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

const ShimmerLinkButton = styled(ShimmerBase)`
  width: 80px;
  height: 20px;
`;
