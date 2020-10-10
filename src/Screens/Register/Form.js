import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Theme} from '../../../contants';
import {Button, Input} from '../../Components';

const Form = () => {
  return (
    <View style={styles.container}>
      <Input label="Telefon" keyboardType="number-pad" />
      <Input label="İsim" half />
      <Input label="Soyad" half />
      <Input label="E-posta" keyboardType="email-address" />
      <Input label="TC Kimlik Numarası" keyboardType="number-pad" />
      <View style={styles.action}>
        <Button color="secondary" full>
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
