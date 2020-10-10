import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SvgFromXml} from 'react-native-svg';
import {Icons, Theme} from '../../../contants';

const {width, height} = Dimensions.get('screen');
const ThirdPary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HIZLI GİRİŞ</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.box, styles.appleregister]}>
        <SvgFromXml
          width={30}
          height={30}
          style={styles.icon}
          xml={Icons.apple}
        />
        <Text style={styles.text}>Apple Hesabımla</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.box, styles.googleregister]}>
        <SvgFromXml
          width={30}
          height={30}
          style={styles.icon}
          xml={Icons.google}
        />
        <Text style={[styles.text, styles.googleText]}>Google Hesabımla</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    width,
    marginBottom: 25,
    color: '#c3c7cb',
    letterSpacing: 0.8,
  },
  box: {
    borderWidth: 1,
    width: width / 2 - 35,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginLeft: 15,
  },
  icon: {
    flex: 1,
  },
  appleregister: {
    marginRight: 25,
    borderColor: '#e5e6e9',
    borderBottomWidth: 4,
  },
  googleregister: {
    borderColor: '#fbd9d7',
    borderBottomWidth: 4,
  },
  googleText: {
    color: '#ed5d51',
  },
});

export default ThirdPary;
