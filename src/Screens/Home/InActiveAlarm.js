import React, {useRef, useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  Animated,
  Easing,
  Alert,
  Platform,
} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {SvgFromXml} from 'react-native-svg';
import {Theme, Icons} from '../../../contants';
import {Modalize} from 'react-native-modalize';
import LiveLocation from './LiveLocation';
import {Button} from '../../Components';
import AuthContext from '../../Contexts/AuthContext';
import ApiRepository from '../../Repository/Api';
import moment from 'moment';
import {ContactPermissionService} from '../../Enums/config';
import Geolocation from '@react-native-community/geolocation';

moment.updateLocale('tr', {
  relativeTime: {
    future: 'in %s',
    past: '%s önce',
    s: 'bir saniye',
    ss: '%d saniye',
    m: 'bir dakika',
    mm: '%d dakika',
    h: 'yaklaşık bir saat',
    hh: '%d saat',
    d: 'yaklaşık bir gün',
    dd: '%d gün',
    w: 'bir hafta ',
    ww: '%d hafta',
    M: 'bir ay',
    MM: '%d ay',
    y: 'bir yıl',
    yy: '%d yıl',
  },
});

const {width} = Dimensions.get('screen');

const InActiveAlarm = ({setIsAlarm, changeBg}) => {
  const {user, updateUser} = useContext(AuthContext);
  const [animationCircle, setAnimationCircle] = useState(false);

  const startBorderWidth = width - 200;
  const endBorderWidth = width - 50;

  const borderAnimation = useRef(new Animated.Value(startBorderWidth)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  runAnimation = () => {
    if (!animationCircle) {
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
        runAnimation();
      });
    }
  };

  const checkPermissions = async () => {
    const version = Platform.OS.toUpperCase();
    let res = false;

    if (version === 'IOS') {
      const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          // 'This feature is not available (on this device / in this context)',
          res = false;
          break;
        case RESULTS.DENIED:
          let resultReqDenied = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          if (resultReqDenied == RESULTS.GRANTED) {
            res = true;
          }
          break;
        case RESULTS.LIMITED:
          let resultReqLimited = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          if (resultReqLimited == RESULTS.GRANTED) {
            res = true;
          }
          break;
        case RESULTS.GRANTED:
          res = true;
          //console.warn('izin verildi');
          break;
        case RESULTS.BLOCKED:
          res = false;
          Alert.alert(
            'Acil durum butonunu kullanmak için konum izni vermeniz gerekmektedir.',
          );
          break;
      }
    } else if (version == 'ANDROID') {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          // 'This feature is not available (on this device / in this context)',
          res = false;
          break;
        case RESULTS.DENIED:
          let resultReqDenied = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (resultReqDenied == RESULTS.GRANTED) {
            res = true;
          }
          break;
        case RESULTS.LIMITED:
          let resultReqLimited = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (resultReqLimited == RESULTS.GRANTED) {
            res = true;
          }
          break;
        case RESULTS.GRANTED:
          //izin verildi
          res = true;
          break;
        case RESULTS.BLOCKED:
          res = false;
          Alert.alert(
            'Acil durum butonunu kullanmak için konum izni vermeniz gerekmektedir.',
          );
          break;
      }
    }
    return res;
  };

  useEffect(() => {
    runAnimation();

    return function cleanUp() {
      setAnimationCircle(true);
    };
  }, [user]);

  const notifyTop = user?.notifications?.length > 0 ? 30 : -200;
  const alertAnimation = useRef(new Animated.Value(notifyTop)).current;
  const modalizeRef = useRef(null);

  const alertRun = (value) => {
    Animated.timing(alertAnimation, {
      toValue: value,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const runSiren = async () => {
    const permission = await checkPermissions();
    if (permission) {
      try {
        Geolocation.getCurrentPosition(async (info) => {
          const {latitude, longitude} = info.coords;
          const postData = {
            latitude,
            longitude,
          };
          const api = new ApiRepository();
          const {data} = await api.post('/Alarm', postData);
          if (data?.Success) {
            changeBg(1);
            setIsAlarm(true);
          } else {
            Alert.alert(data?.Message);
          }
        });
      } catch (error) {
        Alert.alert(error);
      }
    }
  };

  const setModalVisible = () => {
    modalizeRef.current?.open();
    alertRun(-200);
  };

  const borderStyles = [
    styles.circleBorder,
    {
      width: borderAnimation,
      height: borderAnimation,
      opacity: fadeAnim,
    },
  ];

  const permissionSubmit = async (email, permission) => {
    try {
      const postData = {
        email,
        permission,
      };
      const api = new ApiRepository();
      const {data} = await api.post(ContactPermissionService, postData);
      Alert.alert(data?.Message);
      updateUser(data?.Data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <View style={{paddingTop: 30}}>
        {/* Notify Area */}
        {user?.notifications?.map((notify) => {
          const boxStyles = [
            styles.alertBox,
            notify.type === 'info'
              ? styles.alertInfoType
              : styles.alertDangerType,
            {top: alertAnimation, opacity: alertAnimation},
          ];
          return (
            <Animated.View key={`notify-${notify.email}`} style={boxStyles}>
              <View style={styles.alertTop}>
                <View style={styles.alertTitle}>
                  <SvgFromXml
                    fill={Theme.colors.danger}
                    width="20"
                    height="20"
                    xml={Icons.siren}
                  />
                  <Text style={styles.alertTitleText}>
                    {notify.type === 'info' ? 'Yeni Bildirim' : 'Yeni Uyarı'}
                  </Text>
                </View>
                <View style={styles.momentArea}>
                  <Text style={styles.momenText}>
                    {moment(notify.date).locale('tr').fromNow()}
                  </Text>
                  <TouchableOpacity onPress={() => alertRun(-200)}>
                    <FontAwesomeIcon
                      size={20}
                      color={Theme.colors.danger}
                      icon={faTimes}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.alertInfo}>
                {notify.type !== 'info' ? (
                  <View style={styles.avatar}>
                    <Image
                      style={styles.userImage}
                      source={require('../../../assets/media/user.jpg')}
                    />
                  </View>
                ) : null}
                <View style={styles.infoArea}>
                  <View style={styles.userName}>
                    <Text style={styles.userNameText}>{notify.name}</Text>
                  </View>
                  <View style={styles.alertMessage}>
                    <Text>{notify.message}</Text>
                  </View>
                </View>
              </View>
              {notify.type === 'danger' ? (
                <View style={styles.action}>
                  <TouchableOpacity
                    onPress={() => setModalVisible()}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>
                      Canlı Konumu Gör
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.actionPermission}>
                  <Button
                    half
                    smallButton
                    color="secondary"
                    onPress={() => permissionSubmit(notify.email, true)}>
                    <Text style={styles.actionButtonText}>İzin Ver</Text>
                  </Button>
                  <Button
                    half
                    smallButton
                    outline
                    color="gray"
                    onPress={() => permissionSubmit(notify.email, false)}>
                    <Text>İzin Verme</Text>
                  </Button>
                </View>
              )}
            </Animated.View>
          );
        })}

        {/* Notify Area End */}

        <View style={styles.topArea}>
          <View style={styles.userInfo}>
            <Text style={styles.userText}>Hoşgeldiniz</Text>
            <Text style={styles.userText}>
              {`${user.name}  ${user.surname}`}
            </Text>
          </View>
          {user?.notifications?.length > 0 ? (
            <TouchableOpacity
              onPress={() => alertRun(30)}
              style={styles.userAlert}>
              <SvgFromXml
                fill={Theme.colors.danger}
                width="30"
                height="30"
                xml={Icons.siren}
              />
              <Text style={styles.alerText}>Uyarı</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.circleWrapper}>
          <Animated.View style={borderStyles}>
            <Text></Text>
          </Animated.View>
          <View style={styles.circle}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => runSiren()}
              style={styles.circleInside}>
              <SvgFromXml
                fill={Theme.colors.white}
                width="50%"
                height="100"
                xml={Icons.siren}
              />
              <Text style={styles.circleText}>Alarm Ver</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textArea}>
          <Text style={styles.text}>
            Acil durumda Alarm Haber Alma merkezine ve yakınlarınıza bilgi
            vermek için Panik butonuna uzun basın
          </Text>
        </View>
      </View>
      <Modalize
        style={{backgroundColor: 'white', zIndex: 9}}
        modalTopOffset={5}
        ref={modalizeRef}>
        <LiveLocation modalizeRef={modalizeRef} />
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  alertBox: {
    position: 'absolute',
    width: '90%',
    top: 30,
    left: 0,
    margin: 25,
    zIndex: 1,
    padding: 15,
    borderRadius: 10,
    shadowColor: Theme.colors.gray,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
  },
  alertDangerType: {
    backgroundColor: '#ffe5ea',
  },
  alertInfoType: {
    backgroundColor: Theme.colors.white,
  },
  alertTop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  alertInfo: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    flex: 0.3,
  },
  alertTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  alertTitleText: {
    color: Theme.colors.danger,
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.medium,
    marginLeft: 10,
  },
  momentArea: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  momenText: {
    fontSize: Theme.sizes.caption,
    color: Theme.colors.danger,
    marginRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  alertMessage: {},
  infoArea: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  userName: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  userNameText: {
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.text,
  },
  action: {
    marginTop: 25,
  },
  actionPermission: {
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: Theme.colors.danger,
    width: width / 2.5,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  actionButtonText: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.caption,
  },
  topArea: {
    flex: 1,
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
    lineHeight: 25,
  },
  alerText: {
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.caption,
    color: Theme.colors.danger,
  },
  circleWrapper: {
    position: 'relative',
    zIndex: -1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBorder: {
    borderWidth: 2,
    borderColor: '#f7d684',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
  },
  circleInside: {
    width: width - 175,
    height: width - 175,
    backgroundColor: '#ffa933',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowOpacity: 0.6,
    shadowColor: Theme.colors.primary,
    shadowRadius: 25,
  },
  circleText: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.h4,
  },
  textArea: {
    flex: 2,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  text: {
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.light,
    color: Theme.colors.text,
    textAlign: 'center',
    lineHeight: 25,
  },
});

export default InActiveAlarm;
