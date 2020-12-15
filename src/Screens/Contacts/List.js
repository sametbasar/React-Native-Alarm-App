import React, {useContext} from 'react';
import {
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {Badge} from '../../Components/';
import {Theme} from '../../../contants';
import AuthContext from '../../Contexts/AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

const {width, height} = Dimensions.get('screen');

const List = () => {
  const {user} = useContext(AuthContext); 
  _renderItem = ({item, index}) => {
    return (
      <View style={[styles.item, !item.confirmed ? styles.disabled : null]}>
        <View style={styles.avatar}>
          <FontAwesomeIcon color={Theme.colors.gray} icon={faUser} size={30} />
        </View>
        <View style={styles.infoWrap}>
          <View style={styles.userName}>
            <Text style={styles.userOrder}>{++index}. KİŞİ</Text>
            <Text style={styles.userNameText}>{item.name}</Text>
          </View>
          <View style={styles.badges}>
            {item.badge.map((b, i) => {
              return <Badge key={i} badge={b.name} />;
            })}
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={user.contacts}
        keyExtractor={(item, key) => `item-${key}`}
        renderItem={(data, index) => _renderItem(data, index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 25,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    width,
  },
  disabled: {
    opacity: 0.25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Theme.colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userOrder: {
    fontSize: 14,
    color: Theme.colors.gray,
    fontFamily: Theme.fonts.medium,
  },
  userNameText: {
    fontSize: Theme.sizes.base,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.bold,
  },
  infoWrap: {
    marginLeft: 20,
    flexDirection: 'column',
  },
  userName: {},
  badges: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default List;
