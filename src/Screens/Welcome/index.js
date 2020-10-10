import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Actions from './Actions';
import FaceId from './FaceId';
import Logo from './Logo';

const WelcomeScreen = () => {
  return (
    <LinearGradient
      style={styles.container}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      colors={['#f5ecd9', '#f4f7f9']}>
      <Logo />
      <FaceId />
      <Actions />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WelcomeScreen;
