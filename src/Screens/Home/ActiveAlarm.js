import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  PanResponder,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {SvgFromXml} from 'react-native-svg';
import {Theme, Icons} from '../../../contants';

const {width, height} = Dimensions.get('screen');

const ActiveAlarm = ({setIsAlarm, changeBg}) => {
  const [cancelAlert, setCancelAlert] = useState(false);
  const animationSiren = useRef(new Animated.Value(0)).current;
  const sirenAnimation = animationSiren.interpolate({
    inputRange: [0, 1],
    outputRange: [width / 1.25, width / 6],
    easing: Easing.linear,
  });

  const animationLoading = useRef(new Animated.Value(0)).current;

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        let x = pan.x._value;
        pan.setOffset({
          x,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        const contanierWidth = width / 2.5;

        if (Math.abs(pan.x._value) > contanierWidth) {
          console.log('swipe can run');
          cancelProgress();
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  cancelProgress = () => {
    setCancelAlert(true);
    Animated.parallel([
      Animated.timing(animationSiren, {
        toValue: 1,
        easing: Easing.linear,
        useNativeDriver: false,
        duration: 500,
      }),
      Animated.timing(animationLoading, {
        toValue: 1,
        easing: Easing.linear,
        delay: 500,
        useNativeDriver: false,
      }),
    ]).start();
    setTimeout(() => {
      changeBg(0);
      setIsAlarm(false);
    }, 2000);
  };

  return (
    <>
      <View style={{flex: 1, paddingTop: 30}}>
        <View style={styles.topArea}>
          <View style={styles.userInfo}>
            <Text style={styles.userText}>Hoşgeldiniz</Text>
            <Text style={styles.userText}>Samet Başar</Text>
          </View>
        </View>
        <View style={styles.circleWrapper}>
          <View style={styles.circleBorder}>
            <View style={styles.circle}>
              <View style={styles.circleInside}>
                <SvgFromXml
                  fill={Theme.colors.white}
                  width="50%"
                  height="100"
                  xml={Icons.siren}
                />
                <Text style={styles.circleText}>Alarm Verildi</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.alarmArea}>
          <Animated.View
            style={[
              styles.bar,
              {
                width: sirenAnimation,
              },
            ]}>
            {!cancelAlert ? (
              <>
                <Animated.View
                  style={[
                    styles.cancelAlarm,
                    {
                      transform: [{translateX: pan.x}],
                    },
                  ]}
                  {...panResponder.panHandlers}>
                  <FontAwesomeIcon
                    size={32}
                    color={Theme.colors.danger}
                    icon={faTimes}
                  />
                </Animated.View>
                <Text style={styles.barText}>İptal Et</Text>
              </>
            ) : (
              <Animated.View
                style={[
                  styles.loading,
                  {
                    opacity: animationLoading,
                  },
                ]}>
                <ActivityIndicator size="large" color={Theme.colors.white} />
              </Animated.View>
            )}
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topArea: {
    flex: 0.6,
    width,
    padding: 25,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userInfo: {},
  userText: {
    fontFamily: Theme.fonts.light,
    fontSize: Theme.sizes.base,
    color: Theme.colors.white,
    lineHeight: 25,
  },
  circleWrapper: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBorder: {
    width: width - 50,
    height: width - 50,
    borderWidth: 15,
    borderColor: '#d6032c',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  circle: {
    width: width - 125,
    height: width - 125,
    borderWidth: 10,
    borderColor: '#e60030',
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInside: {
    width: width - 175,
    height: width - 175,
    backgroundColor: Theme.colors.danger,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowOpacity: 0.6,
    shadowColor: Theme.colors.danger,
    shadowRadius: 25,
  },
  circleText: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.h4,
  },
  alarmArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
    marginTop: -50,
  },
  bar: {
    backgroundColor: Theme.colors.danger,
    height: 70,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cancelAlarm: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: 500,
    marginLeft: 10,
    shadowColor: Theme.colors.gray,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    zIndex: 2,
  },
  barText: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.h4,
    fontFamily: Theme.fonts.bold,
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default ActiveAlarm;
