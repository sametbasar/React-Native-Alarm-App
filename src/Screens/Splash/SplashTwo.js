import React from 'react';
import {Text, StyleSheet, Dimensions, View} from 'react-native';
import {SvgFromXml} from 'react-native-svg';
import {Theme, Icons} from '../../../contants';

const {width, height} = Dimensions.get('screen');

const SplashTwo = () => (
  <View style={styles.container}>
    <View style={styles.circleWrapper}>
      <View style={styles.circle}>
        <View style={styles.circleInside}>
          <SvgFromXml width="50%" height="150" xml={Icons.phone} />
        </View>
      </View>
    </View>
    <View style={styles.textArea}>
      <Text style={styles.text}>Haber alarm merkezinde alarm oluştur</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: '#ca0229',
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleWrapper: {
    width: width / 1,
    height: width / 1,
    borderWidth: 15,
    borderColor: '#d6032c',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: width / 1.2,
    height: width / 1.2,
    borderWidth: 10,
    borderColor: '#e60030',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInside: {
    width: width / 1.5,
    height: width / 1.5,
    backgroundColor: Theme.colors.danger,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowOpacity: 1,
    shadowColor: Theme.colors.gray,
    shadowRadius: 500,
  },
  circleText: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.h4,
  },
  textArea: {
    marginTop: 30,
    width: width / 2.5,
  },
  text: {
    fontSize: Theme.sizes.h4,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.white,
    textAlign: 'center',
  },
});

export default SplashTwo;
