import React from 'react';

import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Reanimated from 'react-native-reanimated';

import {AnimatedGradientOverlayProps} from './typings';

import {HighlightOverlay, overlayStyles} from '../overlays';

const LinearGradientMask = () => (
  <LinearGradient
    style={overlayStyles.overlay}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    // We need to pass something in the middle of gradient color which
    // will be replaced with highlightColor passed to View inside this MaskView
    colors={['transparent', '#fff', 'transparent']}
  />
);

export const AnimatedGradientOverlay = ({
  highlightColor,
  animationStyles,
}: AnimatedGradientOverlayProps) => (
  <Reanimated.View style={[overlayStyles.overlay, animationStyles]}>
    <MaskedView
      style={overlayStyles.overlay}
      maskElement={<LinearGradientMask />}>
      <HighlightOverlay color={highlightColor} />
    </MaskedView>
  </Reanimated.View>
);
