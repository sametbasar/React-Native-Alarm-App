import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';
import {Theme} from '../../../contants';
import {loginValidationSchema} from './LoginValidation';
import {Button, Input} from '../../Components';
import {LoginService} from '../../Enums/config';
import ApiRepository from '../../Repository/Api';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../Contexts/AuthContext';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

const Form = ({setModalVisible}) => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const onSubmit = (
    values,
    {setSubmitting, setErrors, setStatus, resetForm},
  ) => {
    try {
      const Api = new ApiRepository();
      Api.post(LoginService, values).then(({data}) => {
        if (data.Success) {
          const {Data} = data;
          auth.updateUser(Data);
          AsyncStorage.setItem('AuthToken', Data.token);
          navigation.navigate('Home');
        } else {
          Alert.alert('Üye Girişi', data.Message);
        }
        //setModalVisible(); Email İle Doğrulama...
      });
      resetForm({});
      setStatus({success: true});
    } catch (error) {
      setStatus({success: false});
      setSubmitting(true);
      setErrors({submit: error.message});
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.title}>E-MAIL İLE GİRİŞ</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginValidationSchema}
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
              <View style={{flexDirection: 'column', flex: 1}}>
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
                  <Button onPress={handleSubmit} color="secondary" full>
                    <Text style={styles.textbtn}>Devam Et</Text>
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.gray100,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    width,
    marginBottom: 25,
    color: '#c3c7cb',
    letterSpacing: 0.8,
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
