import React, {useRef} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Theme} from '../../../contants';
import FaceId from '../Welcome/FaceId';
import Form from './Form';
import QuickLogin from './QuickLogin';
import SmsValidation from './SmsValidation';
import {Modalize} from 'react-native-modalize';

const LoginScreen = () => {
  const modalizeRef = useRef(null);

  const setModalVisible = () => {
    modalizeRef.current?.open();
  };
  return (
    <>
      <View style={styles.container}>
        <FaceId />
        <QuickLogin />
        <Form setModalVisible={setModalVisible} />
      </View>
      <Modalize
        style={{backgroundColor: 'white'}}
        modalTopOffset={70}
        ref={modalizeRef}>
        <SmsValidation modalizeRef={modalizeRef} />
      </Modalize>
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

export default LoginScreen;
