import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {Icons, Theme} from '../../../contants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {SvgFromXml} from 'react-native-svg';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import moment from 'moment';
import AuthContext from '../../Contexts/AuthContext';
import Spinner from 'react-native-spinkit';

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

const {width, height} = Dimensions.get('screen');

const LiveLocation = ({modalizeRef}) => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [Coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const closeModal = () => {
    modalizeRef.current?.close();
  };

  useEffect(() => {
    setTimeout(() => {
      const notifys = user?.notifications;
      const coords = notifys[0]?.coords;
      setCoords(coords);
      setLoading(false);
    }, 500);
    return function cleanUp() {
      setLoading(true);
    };
  }, []);
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Canlı Konum</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => closeModal()}>
            <FontAwesomeIcon icon={faTimes} size={25} />
          </TouchableOpacity>
        </View>
        {user?.notifications?.map((notify) => {
          const boxStyles = [
            styles.alertBox,
            notify.type === 'info'
              ? styles.alertInfoType
              : styles.alertDangerType,
          ];
          return (
            <View key={`notify-${notify.email}`} style={boxStyles}>
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
            </View>
          );
        })}

        {loading ? (
          <View
            style={{
              alignItems: 'center',
              marginTop: 150,
            }}>
            <Spinner
              color={Theme.colors.text}
              isVisible
              size={40}
              type={'Wave'}
            />
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{height: height / 1.7, width}}
            initialRegion={{
              latitude: Coords.latitude,
              longitude: Coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            <Marker coordinate={Coords}>
              <View style={styles.markerWrapper}>
                <View style={styles.markerBorder}></View>
                <View style={styles.markerBorder2}></View>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 500,
                  }}
                  source={require('../../../assets/media/user.jpg')}
                />
              </View>
            </Marker>
          </MapView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingTop: 20,
  },
  title: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomColor: Theme.colors.gray100,
    borderBottomWidth: 1,
  },
  titleText: {
    alignItems: 'center',
    lineHeight: 30,
    marginLeft: 10,
    fontSize: Theme.sizes.h4,
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.text,
  },
  alertBox: {
    backgroundColor: '#ffe5ea',
    zIndex: 1,
    padding: 15,
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
  markerWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerBorder: {
    backgroundColor: Theme.colors.danger,
    borderRadius: 500,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    top: 0,
    opacity: 0.1,
  },
  markerBorder2: {
    backgroundColor: Theme.colors.danger,
    borderRadius: 500,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 11.5,
    top: 11.5,
    width: '75%',
    height: '75%',
    opacity: 0.4,
  },
});

export default LiveLocation;
