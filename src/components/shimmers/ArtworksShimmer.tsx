import * as React from 'react';
import {StyleSheet, View} from 'react-native';
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
        <View key={item} style={styles.shimmerContainer}>
          <View style={[styles.shimmerBase, styles.shimmerTitle]} />
          <View style={[styles.shimmerBase, styles.shimmerDescription]} />
          <View style={[styles.shimmerBase, styles.shimmerImage]} />
        </View>
      ))}
    </ShimmerEffectProvider>
  );
};

const styles = StyleSheet.create({
  shimmerContainer: {marginBottom: 24},
  shimmerBase: {backgroundColor: '#fff', borderRadius: 4, marginBottom: 4},
  shimmerTitle: {width: 160, height: 20},
  shimmerDescription: {width: '100%', height: 32},
  shimmerImage: {width: '100%', height: 160},
});
