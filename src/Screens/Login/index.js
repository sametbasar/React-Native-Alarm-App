import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Theme} from '../../../contants';
import FaceId from '../Welcome/FaceId';
import Form from './Form';
import QuickLogin from './QuickLogin';
import SmsValidation from './SmsValidation';
import {Modalize} from 'react-native-modalize';

const {width, height} = Dimensions.get('screen');

const LoginScreen = () => {
  const [isRunAnimate, setIsRunAnimate] = useState(true);
  const modalizeRef = useRef(null);

  const animation = useRef(new Animated.Value(0)).current;

  const animatedStyle = {
    top: animation,
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    if (isRunAnimate) {
      Animated.timing(animation, {
        toValue: -200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const _keyboardDidHide = () => {
    if (isRunAnimate) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const setModalVisible = () => {
    modalizeRef.current?.open();
    setIsRunAnimate(false);
  };
  return (
    <>
      <Animated.View style={[styles.container, animatedStyle]}>
        <FaceId />
        <QuickLogin />
        <Form setModalVisible={setModalVisible} />
      </Animated.View>
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
