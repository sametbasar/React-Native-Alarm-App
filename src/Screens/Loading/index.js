import React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import {Theme} from '../../../contants';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Spinner color={Theme.colors.text} isVisible size={40} type={'Wave'} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Loading;
