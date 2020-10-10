import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {SvgFromXml} from 'react-native-svg';
import {Icons, Theme} from '../../../contants';

const FaceId = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <SvgFromXml width={60} height={60} xml={Icons.faceid} />
      <Text style={styles.text}>Face ID ile Giriş yap</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    marginTop: 20,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 15,
    fontFamily: Theme.fonts.light,
    fontSize: Theme.sizes.caption,
  },
});

export default FaceId;
