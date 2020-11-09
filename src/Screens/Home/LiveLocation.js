import React from 'react';
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

const {width, height} = Dimensions.get('screen');

const LiveLocation = ({modalizeRef}) => {
  const closeModal = () => {
    modalizeRef.current?.close();
  };
  const coordsHome = {
    latitude: 41.0167199,
    longitude: 29.1245255,
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Canlı Konum</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => closeModal()}>
            <FontAwesomeIcon icon={faTimes} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.alertBox}>
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
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Aile Üyesi</Text>
                </View>
              </View>
            </View>
            <View style={styles.action}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Yol Tarifi Al</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{height: height / 1.7, width}}
          initialRegion={{
            latitude: 41.0167199,
            longitude: 29.1245255,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker coordinate={coordsHome}>
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
  badge: {
    backgroundColor: '#ffebcb',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  badgeText: {
    fontSize: Theme.sizes.caption,
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.bold,
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
