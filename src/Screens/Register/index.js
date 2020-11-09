import React, {useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import ThirdPary from './ThirdPartyRegister';
import Form from './Form';
import {Theme} from '../../../contants';

const RegisterScreen = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <ThirdPary />
          <Form />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: Theme.colors.white,
  },
  loading: {
    flex: 1,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginBottom: 50,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: Theme.fonts.light,
  },
});

export default RegisterScreen;
