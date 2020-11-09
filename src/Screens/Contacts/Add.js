import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Switch,
  StyleSheet,
  Text,
} from 'react-native';
import {Icons, Theme} from '../../../contants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Input, Button} from '../../Components';

const {width, height} = Dimensions.get('screen');
const Add = ({modalizeRef}) => {
  const closeModal = () => {
    modalizeRef.current?.close();
  };
  const coordsHome = {
    latitude: 41.0167199,
    longitude: 29.1245255,
  };

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Yeni Kişi</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => closeModal()}>
            <FontAwesomeIcon icon={faTimes} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <Input label="İsim" half />
          <Input label="Soyad" half />
          <Input label="Telefon" keyboardType="number-pad" />
          <Input label="E-Posta Adresi" keyboardType="email-address" />
          <View style={styles.switchArea}>
            <View style={styles.switchTextArea}>
              <Text style={styles.switchText}>Aile Listesine Ekle</Text>
              <Text style={styles.remainAdd}>
                Kalan Aile Üyesi Hakkınız (2/4)
              </Text>
            </View>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>
          <View style={styles.switchArea}>
            <View style={styles.switchTextArea}>
              <Text style={styles.switchAlarmText}>
                Acil Durum Listesine Ekle
              </Text>
            </View>
            <Switch onValueChange={toggleSwitch2} value={isEnabled2} />
          </View>
          <View style={styles.action}>
            <Button onPress={() => alert('todo')} color="secondary" full>
              <Text style={styles.textbtn}>Ekle</Text>
            </Button>
          </View>
        </View>
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
  form: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 25,
    flex: 1,
  },
  action: {
    marginTop: 30,
    width: width - 50,
  },
  textbtn: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.base,
  },
  switchArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 15,
  },
  switchText: {
    color: Theme.colors.primary,
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.bold,
  },
  switchAlarmText: {
    color: Theme.colors.text,
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.bold,
  },
  remainAdd: {
    marginTop: 5,
    color: Theme.colors.gray,
    fontSize: 14,
    fontFamily: Theme.fonts.light,
  },
});

export default Add;
