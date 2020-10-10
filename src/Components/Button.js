import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Theme} from '../../contants';

const Button = (props) => {
  const {color, outline, full, children} = props;
  const buttonStyles = [
    styles.button,
    full && styles.full,
    color && styles[color],
    color && !styles[color] ? {backgroundColor: color} : null,
    outline && styles.outline,
  ];
  return (
    <TouchableOpacity activeOpacity={0.8} style={buttonStyles} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 70,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  full: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
  },
  primary: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  secondary: {
    backgroundColor: Theme.colors.secondary,
    borderColor: Theme.colors.secondary,
  },
  danger: {
    backgroundColor: Theme.colors.danger,
    borderColor: Theme.colors.danger,
  },
  blue: {
    backgroundColor: Theme.colors.blue,
    borderColor: Theme.colors.blue,
  },
  gray: {
    backgroundColor: Theme.colors.gray,
    borderColor: Theme.colors.gray,
  },
});

export default Button;
