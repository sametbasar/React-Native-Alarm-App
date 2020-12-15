import React, {useEffect, useRef} from 'react';
import {Animated, Keyboard, StyleSheet} from 'react-native';
import {Theme} from '../../../contants';
import FaceId from '../Welcome/FaceId';
import Form from './Form';
import QuickLogin from './QuickLogin';
import SmsValidation from './SmsValidation';
import {Modalize} from 'react-native-modalize';
import {ScrollView} from 'react-native-gesture-handler';
import {Easing} from 'react-native-reanimated';

const LoginScreen = () => {
  //const animate = useRef(new Animated.Value(0)).current;
  const modalizeRef = useRef(null);

  const setModalVisible = () => {
    modalizeRef.current?.open();
  };

  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
  //   Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

  //   // cleanup function
  //   return () => {
  //     Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
  //     Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
  //   };
  // }, []);

  // const _keyboardDidShow = () => {
  //   Animated.timing(animate, {
  //     toValue: 0,
  //     duration: 300,
  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const _keyboardDidHide = () => {
  //   Animated.timing(animate, {
  //     toValue: 0,
  //     duration: 300,
  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start();
  // };
  return (
    <>
      <ScrollView style={{flex: 1}}>
        <Animated.View style={styles.container}>
          {/* <FaceId />
          <QuickLogin /> */}
          <Form setModalVisible={setModalVisible} />
        </Animated.View>
      </ScrollView>
      {/*  <Modalize
        style={{backgroundColor: 'white'}}
        modalTopOffset={70}
        ref={modalizeRef}>
        <SmsValidation modalizeRef={modalizeRef} />
      </Modalize> */}
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
