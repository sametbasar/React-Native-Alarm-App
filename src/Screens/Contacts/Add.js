import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Switch,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import {ContactValidations} from './validations';
import AuthContext from '../../Contexts/AuthContext';
import ApiRepository from '../../Repository/Api';
import {Icons, Theme} from '../../../contants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Input, Button} from '../../Components';
import {ContactAddInformationService} from '../../Enums/config';
import Spinner from 'react-native-spinkit';

const {width, height} = Dimensions.get('screen');
const Add = ({modalizeRef}) => {
  const {user, updateUser} = useContext(AuthContext);
  let familyMemberCount = 0;
  user.contacts.find((a) => {
    a.badge.find((b) => {
      if (b.name === 'aile üyesi') familyMemberCount++;
    });
  });
  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const [familySwitch, setFamilySwitch] = useState(familyMemberCount <= 4);
  const toggleSwitch = () => setFamilySwitch((previousState) => !previousState);
  const [emergencySwitch, setEmergencySwitch] = useState(false);
  const toggleEmergency = () =>
    setEmergencySwitch((previousState) => !previousState);

  const onSubmit = async (values, {setSubmitting, resetForm}) => {
    try {
      setSubmitting(true);
      let contact = {
        ...values,
        name: values.name + ' ' + values.surname,
        badge: [
          {
            id: 1,
            name: 'onay bekliyor',
          },
        ],
      };
      if (familySwitch) {
        contact.badge.push({
          id: 2,
          name: 'aile üyesi',
        });
      }
      if (emergencySwitch) {
        contact.badge.push({
          id: 3,
          name: 'acil durum',
        });
      }
      const api = new ApiRepository();
      const {data} = await api.post(ContactAddInformationService, contact);

      if (data.Success) {
        updateUser(data.Data);
        Alert.alert('Kişiler', data.Message);
      } else {
        Alert.alert('Kişiler', data.Message);
      }

      resetForm(); // Formu resetler.
      setSubmitting(false); //buton loadingi kaldırır.
      closeModal(); // modalı kapatır.
    } catch (err) {
      console.log(err);
      setSubmitting(false); //buton loadingi kaldırır.
      resetForm(); // formu resetler
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Yeni Kişi</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => closeModal()}>
            <FontAwesomeIcon icon={faTimes} size={25} />
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            email: '',
            phone: '',
          }}
          validationSchema={ContactValidations}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
            isSubmitting,
            i,
          }) => (
            <>
              <View style={styles.form}>
                <View style={styles.formGroup}>
                  <View>
                    <Input
                      label="İsim"
                      name="name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      half
                    />
                    {touched.name && errors.name && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.name}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Input
                      label="Soyad"
                      name="surname"
                      value={values.surname}
                      onChangeText={handleChange('surname')}
                      half
                    />
                    {touched.surname && errors.surname && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.surname}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.marginBottom}>
                  <Input
                    label="Telefon"
                    name="phone"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    keyboardType="number-pad"
                  />
                  {touched.phone && errors.phone && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.phone}
                    </Text>
                  )}
                </View>
                <View style={styles.marginBottom}>
                  <Input
                    label="E-Posta Adresi"
                    name="email"
                    autoCapitalize={'none'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View style={styles.switchArea}>
                  <View style={styles.switchTextArea}>
                    <Text style={styles.switchText}>Aile Listesine Ekle</Text>
                    <Text style={styles.remainAdd}>
                      Kalan Aile Üyesi Hakkınız ({familyMemberCount}/4)
                    </Text>
                  </View>
                  <Switch
                    disabled={familyMemberCount === 4}
                    onValueChange={toggleSwitch}
                    value={familySwitch}
                  />
                </View>
                <View style={styles.switchArea}>
                  <View style={styles.switchTextArea}>
                    <Text style={styles.switchAlarmText}>
                      Acil Durum Listesine Ekle
                    </Text>
                  </View>
                  <Switch
                    onValueChange={toggleEmergency}
                    value={emergencySwitch}
                  />
                </View>
                <View style={styles.action}>
                  <Button
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    color="secondary"
                    full>
                    {!isSubmitting ? (
                      <Text style={styles.textbtn}>Ekle</Text>
                    ) : (
                      <Spinner
                        color={Theme.colors.white}
                        isVisible
                        size={40}
                        type={'Wave'}
                      />
                    )}
                  </Button>
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingTop: 20,
  },
  marginBottom: {
    marginBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  formGroup: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    flexDirection: 'column',
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
