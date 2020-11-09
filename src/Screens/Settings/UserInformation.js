import React, {useContext, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Theme} from '../../../contants';
import {Button, Input} from '../../Components';
import {RadioGroup} from '../../Components/';
import Geolocation from '@react-native-community/geolocation';
import AuthContext from '../../Contexts/AuthContext';
import {Formik} from 'formik';
import {UserInformationSaveService} from '../../Enums/config';
import ApiRepository from '../../Repository/Api';
import {PoupLoader} from '../../Components/Loader';

const {width, height} = Dimensions.get('screen');

const sex = [
  {id: 1, name: 'Erkek'},
  {id: 2, name: 'Kadın'},
];

const UserInformation = () => {
  const {user} = useContext(AuthContext);
  const [selected, setSelected] = useState({
    id: user.gender === 'Erkek' ? 1 : 2,
    name: user.gender,
  });
  const [location, setLocation] = useState({
    city: user.city,
    district: user.district,
    address: user.address,
  });
  const [loading, setLoading] = useState(false);

  const onSelected = (item) => {
    setSelected(item);
  };

  getMyLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          info.coords.latitude +
          ',' +
          info.coords.longitude +
          '&key=' +
          'AIzaSyDnvlOwSBgBR9HDtbRI5U-dOg76erzC3Tw',
      )
        .then((response) => response.json())
        .then(({results}) => {
          setMyLocation(results[0]);
        });
    });
  };

  const setMyLocation = async (results) => {
    //"administrative_area_level_1" İl
    //"administrative_area_level_2" İlçe

    const address_components = results.address_components;
    const address = results.formatted_address;
    const city = getAreaLevel(
      address_components,
      'administrative_area_level_1',
    );
    const district = getAreaLevel(
      address_components,
      'administrative_area_level_2',
    );

    setLocation({
      city: city.long_name,
      district: district.long_name,
      address,
    });
  };

  const getAreaLevel = (address_components, name) => {
    return address_components.find((item) => {
      return item.types.find((type) => {
        if (type === name) {
          return item;
        }
      });
    });
  };

  const onSubmit = (
    values,
    {setSubmitting, setErrors, setStatus, resetForm},
  ) => {
    try {
      setLoading(true);
      const data = {
        gender: selected.name,
        ...values,
      };
      const Api = new ApiRepository();
      Api.put(UserInformationSaveService, data)
        .then(({data}) => {
          if (data.Success === 'true') {
            const {Data} = data;
            auth.updateUser(Data);
            AsyncStorage.setItem('AuthToken', Data.token);
            Alert.alert('Kişisel Bilgiler', 'Güncellendi!');
          } else {
            Alert.alert('Kişisel Bilgiler', data.Message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      setStatus({success: true});
    } catch (error) {
      setLoading(false);
      Alert.alert('Kişisel Bilgiler', 'Bir hata oluştu');
      setStatus({success: false});
      setSubmitting(true);
      setErrors({submit: error.message});
    }
  };

  return (
    <>
      {loading ? <PoupLoader /> : null}
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <Formik
            initialValues={{
              name: user.name,
              surname: user.surname,
              email: user.email,
              phone: user.phone.toString(),
              identityNumber: user.identityNumber.toString(),
              city: location.city,
              district: location.district,
              address: location.address,
            }}
            onSubmit={onSubmit}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={styles.container}>
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
                <Input
                  label="E-Posta"
                  name="email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.email}
                  </Text>
                )}
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
                <Input
                  label="Kimlik Numarası"
                  name="identityNumber"
                  value={values.identityNumber}
                  onChangeText={handleChange('identityNumber')}
                  keyboardType="number-pad"
                />
                {touched.identityNumber && errors.identityNumber && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.identityNumber}
                  </Text>
                )}
                <View style={styles.radioGroup}>
                  <Text style={styles.radioText}>Cinsiyet</Text>
                  <RadioGroup
                    selected={selected}
                    onSelected={onSelected}
                    items={sex}
                  />
                </View>
                <View style={styles.addressInformation}>
                  <View style={{width: '100%', alignItems: 'flex-end'}}>
                    <View style={styles.locationButton}>
                      <Button
                        onPress={() => getMyLocation()}
                        smallButton
                        color="gray"
                        outline>
                        <Text style={{paddingHorizontal: 15}}>
                          lokasyonumdan getir
                        </Text>
                      </Button>
                    </View>
                  </View>
                  <Input
                    label="Şehir"
                    name="city"
                    value={location.city}
                    onChangeText={handleChange('city')}
                    half
                  />
                  <Input
                    label="İlçe"
                    name="district"
                    value={values.district}
                    onChangeText={handleChange('district')}
                    half
                  />
                  <Input
                    label="Ev Adresi"
                    name="address"
                    value={values.address}
                    onChangeText={handleChange('address')}
                    textarea
                  />
                </View>
                <View style={styles.action}>
                  <Button onPress={handleSubmit} color="secondary" full>
                    <Text style={styles.textbtn}>Kaydet</Text>
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 25,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  radioGroup: {
    flexDirection: 'column',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.gray100,
    width: '100%',
  },
  radioText: {
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.gray,
  },
  addressInformation: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
  },
  locationButton: {
    marginBottom: 25,
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

export default UserInformation;
