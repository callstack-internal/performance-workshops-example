import React from 'react';
import {StyleSheet} from 'react-native';
import {Overlay, OverlayProps} from './Overlay';

type BackgroundOverlayProps = Pick<OverlayProps, 'color'>;

export const BackgroundOverlay = ({color}: BackgroundOverlayProps) => {
  return <Overlay color={color} styles={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    overflow: 'hidden',
  },
});
