import React, {useEffect, useContext, useRef, useState} from 'react';
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
import ApiRepository from '../../Repository/Api';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {SvgFromXml} from 'react-native-svg';
import {Theme, Icons} from '../../../contants';
import AuthContext from '../../Contexts/AuthContext';

const {width, height} = Dimensions.get('screen');

const ActiveAlarm = ({setIsAlarm, changeBg}) => {
  const {user} = useContext(AuthContext);

  const startBorderWidth = width - 250;
  const endBorderWidth = width - 50;

  const borderAnimation = useRef(new Animated.Value(startBorderWidth)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [cancelAlert, setCancelAlert] = useState(false);
  const animationSiren = useRef(new Animated.Value(0)).current;

  const sirenAnimation = animationSiren.interpolate({
    inputRange: [0, 1],
    outputRange: [width / 1.25, width / 6],
    easing: Easing.linear,
  });

  const animationLoading = useRef(new Animated.Value(0)).current;

  runAnimationAlarm = (stop) => {
    if (!stop) {
      borderAnimation.setValue(startBorderWidth);
      fadeAnim.setValue(1);

      Animated.parallel([
        Animated.timing(borderAnimation, {
          toValue: endBorderWidth,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start(() => {
        runAnimationAlarm();
      });
    }
  };
  useEffect(() => {
    runAnimationAlarm();
    return function cleanUp() {
      runAnimation(false);
    };
  }, []);

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

  cancelProgress = async () => {
    const api = new ApiRepository();
    const {data} = await api.post('/Alarm/Cancel');
    if (data?.Success) {
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
      changeBg(0);
      setIsAlarm(false);
    }
  };

  const borderStyles = [
    styles.circleBorder,
    {
      width: borderAnimation,
      height: borderAnimation,
      opacity: fadeAnim,
    },
  ];

  return (
    <>
      <View style={{flex: 1, paddingTop: 30}}>
        <View style={styles.topArea}>
          <View style={styles.userInfo}>
            <Text style={styles.userText}>Hoşgeldiniz</Text>
            <Text
              style={styles.userText}>{`${user.name}  ${user.surname}`}</Text>
          </View>
        </View>
        <View style={styles.circleWrapper}>
          <Animated.View style={borderStyles} />
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
    borderWidth: 15,
    borderColor: '#e60030',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
  },
  circle: {
    width: width - 125,
    height: width - 125,
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
