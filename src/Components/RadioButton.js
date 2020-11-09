import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Theme} from '../../contants';

const RadioButton = (props) => {
  const {item, selected, onSelected} = props;

  return (
    <TouchableOpacity
      style={styles.radioButton}
      onPress={() => onSelected(item)}>
      <View style={styles.button}>
        {selected?.id === item.id && <View style={styles.selectedButton} />}
      </View>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingLeft: 0,
  },
  button: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Theme.colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedButton: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: Theme.colors.text,
  },
});

export default RadioButton;
