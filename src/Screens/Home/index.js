import React, {useState, useRef, useContext, useEffect} from 'react';
import {StyleSheet, Dimensions, Animated, Text, Easing} from 'react-native';
import {Theme} from '../../../contants';
import AuthContext from '../../Contexts/AuthContext';
import ActiveAlarm from './ActiveAlarm';
import InActiveAlarm from './InActiveAlarm';

const {width, height} = Dimensions.get('screen');

const statusBackground = {
  active: '#cc012a',
  passive: Theme.colors.gray100,
};

const HomeScreen = () => {
  const {user} = useContext(AuthContext);
  const isEmergency = user?.emergency;
  const [isAlarm, setIsAlarm] = useState(isEmergency);
  const containerAnimation = useRef(new Animated.Value(isEmergency ? 1 : 0))
    .current;
  const containerStyle = containerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [statusBackground.passive, statusBackground.active],
    easing: Easing.linear,
  });

  runAnimate = (value) => {
    Animated.timing(containerAnimation, {
      toValue: value,
      easing: Easing.linear,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: containerStyle,
        },
      ]}>
      {!isAlarm ? (
        <InActiveAlarm setIsAlarm={setIsAlarm} changeBg={runAnimate} />
      ) : (
        <ActiveAlarm setIsAlarm={setIsAlarm} changeBg={runAnimate} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
});

export default HomeScreen;
