import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {Theme} from '../../../contants';
import {Button, Input} from '../../Components';

const {width, height} = Dimensions.get('screen');

const Form = ({setModalVisible}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CEP TELEFONU İLE GİRİŞ</Text>
      <Input label="Telefon" keyboardType="number-pad" />
      <View style={styles.action}>
        <Button onPress={() => setModalVisible()} color="secondary" full>
          <Text style={styles.textbtn}>Devam Et</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray100,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    width,
    marginBottom: 25,
    color: '#c3c7cb',
    letterSpacing: 0.8,
  },
  action: {
    marginTop: 30,
    width: '100%',
  },
  textbtn: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.base,
  },
});

export default Form;
