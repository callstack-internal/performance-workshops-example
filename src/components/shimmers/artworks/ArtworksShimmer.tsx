import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

export const ArtworksShimmer = () => {
  const protoArray = new Array(10);

  const renderItem = () => (
    <View style={styles.shimmerContainer}>
      <ShimmerPlaceholder
        style={[styles.shimmerBase, styles.shimmerTitle]}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        style={[styles.shimmerBase, styles.shimmerDescription]}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        style={[styles.shimmerBase, styles.shimmerImage]}
        LinearGradient={LinearGradient}
      />
    </View>
  );
  return <FlatList renderItem={renderItem} data={protoArray} />;
};

const styles = StyleSheet.create({
  shimmerContainer: {marginBottom: 24},
  shimmerBase: {borderRadius: 4, marginBottom: 4},
  shimmerTitle: {height: 20},
  shimmerDescription: {width: '100%', height: 32},
  shimmerImage: {width: '100%', height: 160},
});
