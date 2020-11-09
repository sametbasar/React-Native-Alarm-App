import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Loading = () => {
  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder>
        <View style={styles.container}>
          <View style={styles.image} />
          <View style={styles.infoWrap}>
            <View style={styles.userName} />
            <View style={styles.badge} />
          </View>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View style={styles.container}>
          <View style={styles.image} />
          <View style={styles.infoWrap}>
            <View style={styles.userName} />
            <View style={styles.badge} />
          </View>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View style={styles.container}>
          <View style={styles.image} />
          <View style={styles.infoWrap}>
            <View style={styles.userName} />
            <View style={styles.badge} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  infoWrap: {
    marginLeft: 20,
  },
  userName: {
    width: 120,
    height: 20,
    borderRadius: 4,
  },
  badge: {
    marginTop: 6,
    width: 80,
    height: 20,
    borderRadius: 4,
  },
});

export default Loading;
