import React from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import {SvgFromXml} from 'react-native-svg';
import {Icons, Theme} from '../../../contants';

const {width, height} = Dimensions.get('screen');

const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <SvgFromXml
          fill={Theme.colors.white}
          width="75%"
          height="75%"
          xml={Icons.siren}
        />
      </View>
      <Text style={styles.logoText}>Panik Butonu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 35,
    flex: .9,
  },
  logo: {
    width: width / 3.5,
    height: width / 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
    padding: 20,
    borderRadius: 20,
    shadowColor: Theme.colors.gray,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 10,
    },
    elevation: 5,
    marginBottom: 30,
  },
  logoText: {
    fontSize: Theme.sizes.h3,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.bold,
  },
});

export default Logo;
