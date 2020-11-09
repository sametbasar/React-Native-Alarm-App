import React, {useRef, useContext} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {SvgFromXml} from 'react-native-svg';
import {Theme, Icons} from '../../../contants';
import {Modalize} from 'react-native-modalize';
import LiveLocation from './LiveLocation';
import {Badge} from '../../Components';
import AuthContext from '../../Contexts/AuthContext';

const {width, height} = Dimensions.get('screen');

const InActiveAlarm = ({setIsAlarm, changeBg}) => {
  const alertAnimation = useRef(new Animated.Value(-200)).current;
  const modalizeRef = useRef(null);
  const auth = useContext(AuthContext);
  const alertRun = (value) => {
    Animated.timing(alertAnimation, {
      toValue: value,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const runSiren = () => {
    changeBg(1);
    setIsAlarm(true);
  };

  const setModalVisible = () => {
    modalizeRef.current?.open();
    alertRun(-200);
  };

  return (
    <>
      <View style={{paddingTop: 30}}>
        <Animated.View
          style={[
            styles.alertBox,
            {top: alertAnimation, opacity: alertAnimation},
          ]}>
          <View style={styles.alertTop}>
            <View style={styles.alertTitle}>
              <SvgFromXml
                fill={Theme.colors.danger}
                width="20"
                height="20"
                xml={Icons.siren}
              />
              <Text style={styles.alertTitleText}>Yeni Uyarı</Text>
            </View>
            <View style={styles.momentArea}>
              <Text style={styles.momenText}>15 dakika önce</Text>
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
            <View style={styles.infoArea}>
              <Image
                style={styles.userImage}
                source={require('../../../assets/media/user.jpg')}
              />
              <View style={styles.userName}>
                <Text style={styles.userNameText}>Cem SAL</Text>
                <Badge badge="aile üyesi" />
              </View>
            </View>
            <View style={styles.action}>
              <TouchableOpacity
                onPress={() => setModalVisible()}
                style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Canlı Konumu Gör</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        <View style={styles.topArea}>
          <View style={styles.userInfo}>
            <Text style={styles.userText}>Hoşgeldiniz</Text>
            <Text style={styles.userText}>
              {`${auth.user.name}  ${auth.user.surname}`}
            </Text>
          </View>
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
        </View>
        <View style={styles.circleWrapper}>
          <View style={styles.circleBorder}>
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
        </View>
        <View style={styles.textArea}>
          <Text style={styles.text}>
            Acil durumda Alarm Haber Alma merkezine ve yakınlarınıza bilgi
            vermek için Panik butonuna uzun basın
          </Text>
        </View>
        <Modalize
          style={{backgroundColor: 'white'}}
          modalTopOffset={5}
          ref={modalizeRef}>
          <LiveLocation modalizeRef={modalizeRef} />
        </Modalize>
      </View>
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
    backgroundColor: '#ffe5ea',
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
  alertTop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
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
  infoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  userNameText: {
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.text,
  },
  action: {
    marginTop: 25,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBorder: {
    width: width - 50,
    height: width - 50,
    borderWidth: 2,
    borderColor: '#f7d684',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  circle: {
    width: width - 125,
    height: width - 125,
    borderWidth: 2,
    borderColor: '#f7d684',
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
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
