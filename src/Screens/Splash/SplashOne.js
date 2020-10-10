import React from 'react';
import {Text, StyleSheet, Dimensions, View} from 'react-native';
import {SvgFromXml} from 'react-native-svg';
import {Theme, Icons} from '../../../contants';

const {width, height} = Dimensions.get('screen');

const SplashOne = () => (
  <View style={styles.container}>
    <View style={styles.circleWrapper}>
      <View style={styles.circle}>
        <View style={styles.circleInside}>
          <SvgFromXml
            fill={Theme.colors.white}
            width="50%"
            height="150"
            xml={Icons.siren}
          />
          <Text style={styles.circleText}>Alarm Ver</Text>
        </View>
      </View>
    </View>
    <View style={styles.textArea}>
      <Text style={styles.text}>Acil durumda panik butonuna dokunursunuz</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: Theme.colors.primary,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleWrapper: {
    width: width / 1.05,
    height: width / 1.05,
    borderWidth: 2,
    borderColor: '#ffa100',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: width / 1.25,
    height: width / 1.25,
    borderWidth: 2,
    borderColor: '#ffa100',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInside: {
    width: width / 1.5,
    height: width / 1.5,
    backgroundColor: '#ffa933',
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

export default SplashOne;
