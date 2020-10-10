import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {Theme} from '../../../contants';
import {Button} from '../../Components';
import {useNavigation} from '@react-navigation/native';

const Actions = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.register}>
        <Text style={styles.text}>Üyelik Oluştur</Text>
        <Button onPress={() => navigation.navigate('Register')} color="primary">
          <Text style={styles.registerbuttontext}>Yeni Üyelik Oluştur</Text>
        </Button>
      </View>
      <View style={styles.register}>
        <Text style={styles.text}>Zaten Üyeyim</Text>
        <Button color="gray" outline onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttontext}>Giriş Yap</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 50,
    paddingHorizontal: 25,
  },
  register: {
    marginBottom: 50,
  },
  text: {
    marginBottom: 15,
    color: '#c3c7cb',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  }, 
  registerbuttontext: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.bold,
    textAlign: 'center',
  }, 
  buttontext: {
    color: Theme.colors.text,
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.bold,
    textAlign: 'center',
  },
});

export default Actions;
