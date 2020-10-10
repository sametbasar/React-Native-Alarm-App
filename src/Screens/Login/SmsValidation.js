import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgFromXml} from 'react-native-svg';
import {Icons, Theme} from '../../../contants';
import {Button, Input} from '../../Components';

const SmsValidation = ({modalizeRef}) => {
  const navigation = useNavigation();

  const closeModal = () => {
    modalizeRef.current?.close();
  };
  const smsConfirmed = () => {
    closeModal();
    navigation.navigate('Home');
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.title}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => closeModal()}>
            <SvgFromXml
              style={{
                transform: [
                  {
                    rotate: '180deg',
                  },
                ],
              }}
              fill={Theme.colors.text}
              xml={Icons.arrowRight}
              width={30}
              height={30}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>SMS Onayı</Text>
        </View>
        <View style={styles.smsArea}>
          <View>
            <Text style={styles.smsText}>
              Lütfen
              <Text style={{fontFamily: Theme.fonts.bold}}>
                {' '}
                538 481 81 97{' '}
              </Text>
              nolu telefonunuza SMS ile gönderilen doğrulama kodunu giriniz.
            </Text>
          </View>
          <View style={styles.smsEnterCode}>
            <Input code maxLength={1} />
            <Input code maxLength={1} />
            <Input code maxLength={1} />
            <Input code maxLength={1} />
          </View>
          <View style={styles.reSendCode}>
            <TouchableOpacity onPress={() => alert('todo')}>
              <Text style={styles.reSendButton}>tekrar gönder</Text>
            </TouchableOpacity>
          </View>
          <Button color="secondary" full onPress={() => smsConfirmed()}>
            <Text style={styles.buttonText}>Devam Et</Text>
          </Button>
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
  smsArea: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  smsText: {
    lineHeight: 25,
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.light,
    color: Theme.colors.text,
  },
  smsEnterCode: {
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reSendCode: {
    marginVertical: 25,
  },
  reSendButton: {
    fontSize: Theme.sizes.caption,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.bold,
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
  },
  buttonText: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.base,
  },
});

export default SmsValidation;
