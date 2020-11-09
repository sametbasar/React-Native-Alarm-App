import React from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';
import {Theme} from '../../contants';

export const PoupLoader = () => {
  return (
    <>
      <View style={styles.darkness} />
      <View style={styles.container}>
        <View style={styles.popup}>
          <Spinner
            color={Theme.colors.text}
            isVisible
            size={40}
            type={'Wave'}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  darkness: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
    opacity: 0.2,
    zIndex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
    zIndex: 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: 10,
  },
});
