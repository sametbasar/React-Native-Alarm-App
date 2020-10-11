import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Alert,
} from 'react-native';
import {} from 'react-native-gesture-handler';
import {SvgFromXml} from 'react-native-svg';
import {Theme, Icons} from '../../../contants';

const {width, height} = Dimensions.get('screen');

const HomeScreen = () => (
  <View style={styles.container}>
    <View style={styles.topArea}>
      <View style={styles.userInfo}>
        <Text style={styles.userText}>Hoşgeldiniz</Text>
        <Text style={styles.userText}>Samet Başar</Text>
      </View>
      <View style={styles.userAlert}>
        <SvgFromXml
          fill={Theme.colors.danger}
          width="30"
          height="30"
          xml={Icons.siren}
        />
        <Text style={styles.alerText}>Uyarı</Text>
      </View>
    </View>
    <View style={styles.circleWrapper}>
      <View style={styles.circle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onLongPress={() => Alert.alert('Todo!')}
          style={styles.circleInside}>
          <SvgFromXml
            fill={Theme.colors.white}
            width="50%"
            height="100"
            xml={Icons.siren}
          />
          <Text style={styles.circleText}>Alarm Ver</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.textArea}>
      <Text style={styles.text}>
        Acil durumda Alarm Haber Alma merkezine ve yakınlarınıza bilgi vermek
        için Panik butonuna uzun basın
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: Theme.colors.gray100,
    height,
    alignItems: 'center',
    paddingTop: 60,
  },
  topArea: {
    marginBottom: 50,
    padding: 25,
    width,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userInfo: {},
  userText: {
    fontFamily: Theme.fonts.light,
    fontSize: Theme.sizes.base,
    lineHeight: 25,
  },
  alerText: {
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.caption,
    color: Theme.colors.danger,
  },
  circleWrapper: {
    width: width / 1,
    height: width / 1,
    borderWidth: 2,
    borderColor: '#f7d684',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: width / 1.2,
    height: width / 1.2,
    borderWidth: 2,
    borderColor: '#f7d684',
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
    shadowOpacity: 0.6,
    shadowColor: Theme.colors.primary,
    shadowRadius: 25,
  },
  circleText: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.h4,
  },
  textArea: {
    marginTop: 30,
    width: width / 1.25,
  },
  text: {
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.light,
    color: Theme.colors.text,
    textAlign: 'center',
    lineHeight: 25,
  },
});

export default HomeScreen;
