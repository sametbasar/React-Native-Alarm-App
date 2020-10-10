import React, {useRef} from 'react';
import {
  Animated,
  View,
  Easing,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Theme} from '../../contants';

const {width, height} = Dimensions.get('screen');

const Input = (props) => {
  const {label, code, half, secure, keyboardType} = props;
  const animateTop = useRef(new Animated.Value(20)).current;

  const labelAnimate = (value) => {
    Animated.timing(animateTop, {
      toValue: value,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  const inputChange = (value) => {
    const text = value.nativeEvent.text;
    if (text.length > 0) {
      labelAnimate(5);
    } else {
      labelAnimate(20);
    }
  };
  const form = [styles.formgroup, half && styles.half, code && styles.code];
  return (
    <View style={form}>
      <Animated.Text style={[styles.label, {top: animateTop}]}>
        {label}
      </Animated.Text>
      <TextInput
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChange={inputChange}
        style={[styles.input, code && styles.codeInput]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formgroup: {
    position: 'relative',
    marginBottom: 15,
    width: '100%',
  },
  half: {
    width: width / 2 - 30,
  },
  code: {
    width: width / 4 - 30,
  },
  label: {
    color: Theme.colors.gray,
    fontSize: Theme.sizes.base,
    position: 'absolute',
    left: 15,
    zIndex: 2,
  },
  input: {
    backgroundColor: Theme.colors.gray100,
    height: 60,
    paddingTop: 10,
    borderRadius: 5,
    paddingLeft: 20,
    fontSize: Theme.sizes.base,
    color: Theme.colors.text,
  },
  codeInput: {
    height: 100,
    textAlign: 'center',
    paddingLeft: 0,
    paddingTop: 0,
    fontSize: Theme.sizes.h1,
  },
});

export default Input;
