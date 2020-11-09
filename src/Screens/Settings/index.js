import React, {useContext} from 'react';
import {Text, StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUsers,
  faUserShield,
  faQuestionCircle,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import {Theme} from '../../../contants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../Contexts/AuthContext';

const data = [
  {
    name: 'Kişisel Bilgilerim',
    url: 'UserInformation',
    icon: (
      <FontAwesomeIcon
        color={Theme.colors.text}
        icon={faUserShield}
        size={26}
      />
    ),
  },
  {
    name: 'Kişilerim',
    url: 'Contact',
    icon: (
      <FontAwesomeIcon color={Theme.colors.text} icon={faUsers} size={26} />
    ),
  },
  {
    name: 'Yardım',
    url: '',
    icon: (
      <FontAwesomeIcon
        color={Theme.colors.text}
        icon={faQuestionCircle}
        size={26}
      />
    ),
  },
];

const SettingsScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.url)}
        activeOpacity={0.8}
        style={styles.listItem}>
        {item.icon}
        <Text style={styles.listItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  logOut = () => {
    AsyncStorage.removeItem('AuthToken');
    navigation.navigate('Welcome');
    auth.updateUser({});
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.bigTitle}>Merhaba</Text>
          <Text style={styles.userName}>{`${auth.user.name} ${auth.user.surname}`}</Text>
        </View>
        <View style={styles.list}>
          <FlatList
            renderItem={(data) => _renderItem(data)}
            keyExtractor={(item, index) => 'item-' + index}
            data={data}
          />
        </View>
        <TouchableOpacity
          onPress={() => logOut()}
          activeOpacity={0.8}
          style={styles.logOut}>
          <FontAwesomeIcon
            color={Theme.colors.text}
            icon={faSignOutAlt}
            size={26}
          />
          <Text style={styles.listItemText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    marginHorizontal: 25,
    flex: 1,
  },
  title: {
    flex: 0.15,
    marginBottom: 20,
  },
  bigTitle: {
    fontSize: Theme.sizes.h3,
    color: Theme.colors.gray,
    marginBottom: 5,
  },
  userName: {
    fontSize: Theme.sizes.h2,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.bold,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30,
    borderBottomColor: Theme.colors.gray,
    borderBottomWidth: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  listItemText: {
    marginLeft: 10,
    color: Theme.colors.text,
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.medium,
  },
  logOut: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SettingsScreen;
