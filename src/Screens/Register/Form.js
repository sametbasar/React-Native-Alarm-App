import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Theme} from '../../../contants';
import {Button, Input} from '../../Components';
import {SignUpService} from '../../Enums/config';
import {registerValidationSchema} from './RegisterValidation';
import ApiRepository from '../../Repository/Api';
import {Formik} from 'formik';
import {PoupLoader} from '../../Components/Loader';

const Form = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  function onSubmit(values, {setSubmitting, setErrors, setStatus, resetForm}) {
    try {
      setLoading(true);
      const Api = new ApiRepository();
      Api.post(SignUpService, values).then(({data}) => {
        if (data.Success) {
          navigation.navigate('Login');
        } else {
          Alert.alert('Yeni Üye', data.Message);
        }
      });
      setLoading(false);
      resetForm({});
      setStatus({success: true});
    } catch (error) {
      setStatus({success: false});
      setSubmitting(false);
      setLoading(false);
      setErrors({submit: error.message});
    }
  }
  return (
    <>
      {loading ? <PoupLoader /> : null}
      <KeyboardAvoidingView behavior={'position'}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              email: '',
              phone: '',
              surname: '',
              identityNumber: '',
              password: '',
            }}
            validationSchema={registerValidationSchema}
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
              <View style={styles.form}>
                <View style={styles.marginBottom}>
                  <Input
                    name="phone"
                    label="Telefon"
                    keyboardType="number-pad"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.phone}
                    </Text>
                  )}
                </View>
                <View style={styles.formGroup}>
                  <View>
                    <Input
                      label="İsim"
                      name="name"
                      half
                      value={values.name}
                      onChangeText={handleChange('name')}
                    />
                    {touched.name && errors.name && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.name}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Input
                      name="surname"
                      label="Soyad"
                      half
                      value={values.surname}
                      onChangeText={handleChange('surname')}
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
                    label="E-posta"
                    keyboardType="email-address"
                    autoCapitalize={'none'}
                    value={values.email}
                    name="email"
                    onChangeText={handleChange('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View style={styles.marginBottom}>
                  <Input
                    name="identityNumber"
                    label="TC Kimlik Numarası"
                    keyboardType="number-pad"
                    maxLength={11}
                    value={values.identityNumber}
                    onChangeText={handleChange('identityNumber')}
                  />
                  {touched.identityNumber && errors.identityNumber && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.identityNumber}
                    </Text>
                  )}
                </View>
                <View style={styles.marginBottom}>
                  <Input
                    label="Şifre"
                    value={values.password}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                  />
                  {touched.password && errors.password && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.password}
                    </Text>
                  )}
                </View>
                <View style={styles.action}>
                  <Button
                    disabled={isSubmitting}
                    color="secondary"
                    full
                    onPress={handleSubmit}>
                    {isSubmitting ? (
                      <ActivityIndicator size={350} color={'white'} />
                    ) : (
                      <Text style={styles.textbtn}>Devam Et</Text>
                    )}
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray100,
    flex: 1,
    zIndex: 9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Theme.colors.white,
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  formGroup: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginBottom: {
    marginBottom: 15,
  },
  action: {
    marginTop: 30,
    width: '100%',
  },
  textbtn: {
    color: Theme.colors.white,
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.base,
  },
});

export default Form;
