import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import ThirdPary from './ThirdPartyRegister';
import Form from './Form';
import {Theme} from '../../../contants';

const {width, height} = Dimensions.get('screen');
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
});

export default RegisterScreen;
