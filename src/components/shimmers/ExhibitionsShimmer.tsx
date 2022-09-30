import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import styled from 'styled-components/native';
import {defaultColorMode, shimmerColors} from '~utils/colors';
import {ShimmerEffectProvider} from './shimmer-effect-provider';

type Props = {
  colorMode: ColorSchemeName;
};

export const ExhibitionsShimmer = ({colorMode}: Props) => {
  const protoArray = [1, 2, 3];

  return (
    <ShimmerEffectProvider
      animate
      backgroundColor={shimmerColors[colorMode || defaultColorMode].background}>
      {protoArray.map(item => (
        <ShimmerContainer key={item}>
          <ShimmerTitle />
          <ShimmerDescription />
          <ShimmerImage />
          <ShimmerLinkButton />
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

const ShimmerLinkButton = styled(ShimmerBase)`
  width: 80px;
  height: 20px;
`;
