import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {LayoutChangeEvent} from 'react-native';

import {
  AnimatedGradientOverlay,
  MaskContainer,
  BackgroundOverlay,
  // useAnimatedGradient,
  useAnimatedGradientAlt,
} from './components';
import {defaultColors} from './styles';
import {
  ShimmerEffectProviderBaseProps,
  ShimmerEffectProviderProps,
  Layout,
} from './typings';

const DURATION = 800;

const ShimmerEffectProviderBase = ({
  children,
  backgroundColor,
  highlightColor,
  duration,
  setFlex,
}: ShimmerEffectProviderBaseProps) => {
  const [layout, setLayout] = React.useState<Layout>();

  // const animationStyles = useAnimatedGradient(duration, layout);

  const handleSetLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setLayout({width, height});
  };

  if (!layout) {
    return (
      <MaskContainer setLayout={handleSetLayout} setFlex={setFlex}>
        {children}
      </MaskContainer>
    );
  }

  return (
    <ShimmerEffect
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}
      duration={duration}
      setFlex={setFlex}
      layout={layout}>
      {children}
    </ShimmerEffect>
  );
};

type ShimmerEffectProps = ShimmerEffectProviderBaseProps & {
  layout: Layout;
};

const ShimmerEffect = ({
  children,
  backgroundColor: customBackgroundColor,
  highlightColor: customHighlightColor,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  duration = DURATION, // need only in standard approach
  setFlex,
  layout,
}: ShimmerEffectProps) => {
  const backgroundColor = customBackgroundColor ?? defaultColors.lightGray;
  const highlightColor = customHighlightColor ?? defaultColors.darkGray;

  // const animationStyles = useAnimatedGradient(duration, layout);
  const animationStyles = useAnimatedGradientAlt(layout.width);

  return (
    <MaskedView
      style={{height: layout.height, width: layout.width}}
      maskElement={<MaskContainer setFlex={setFlex}>{children}</MaskContainer>}>
      <BackgroundOverlay color={backgroundColor} />
      <AnimatedGradientOverlay
        highlightColor={highlightColor}
        animationStyles={animationStyles}
      />
    </MaskedView>
  );
};

export const ShimmerEffectProvider = ({
  animate = true,
  children,
  ...baseProps
}: ShimmerEffectProviderProps) => {
  // eliminate unwanted component return type from children typed as ReactNode
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!animate) {
    return <>{children}</>;
  }

  return (
    <ShimmerEffectProviderBase {...baseProps}>
      {children}
    </ShimmerEffectProviderBase>
  );
};
