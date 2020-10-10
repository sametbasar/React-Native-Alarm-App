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
          <SvgFromXml
            fill={Theme.colors.white}
            width="50%"
            height="150"
            xml={Icons.group}
          />
        </View>
      </View>
    </View>
    <View style={styles.textArea}>
      <Text style={styles.text}>
        Haber alma önce sizi arar, sonrasında yakınlarınıza haber verir
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: '#9accfe',
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleWrapper: {
    width: width / 1,
    height: width / 1,
    borderWidth: 15,
    borderColor: '#98cafc',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: width / 1.2,
    height: width / 1.2,
    borderWidth: 10,
    borderColor: '#a2d1ff',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInside: {
    width: width / 1.5,
    height: width / 1.5,
    backgroundColor: Theme.colors.blue,
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
    width: width / 2,
  },
  text: {
    fontSize: Theme.sizes.h4,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.white,
    textAlign: 'center',
  },
});

export default SplashTwo;
