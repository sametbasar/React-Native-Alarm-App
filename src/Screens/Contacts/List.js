import React from 'react';
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

const data = [
  {
    id: 1,
    name: 'Babam',
    image: require('../../../assets/media/user.jpg'),
    order: '1',
    confirmed: true,
    badges: [
      {
        id: 1,
        name: 'aile üyesi',
      },
      {
        id: 2,
        name: 'kişiler listesinde',
      },
    ],
  },
  {
    id: 2,
    name: 'Deniz Yılmaz',
    image: require('../../../assets/media/user.jpg'),
    order: '2',
    confirmed: false,
    badges: [
      {
        id: 1,
        name: 'onay bekliyor',
      },
    ],
  },
  {
    id: 3,
    name: 'Erdem Yılmaz',
    image: require('../../../assets/media/user.jpg'),
    order: '3',
    confirmed: true,
    badges: [],
  },
  {
    id: 4,
    name: 'Merve Solmazer',
    image: require('../../../assets/media/user.jpg'),
    order: '4',
    confirmed: true,
    badges: [{id: 1, name: 'aile üyesi'}],
  },
  {
    id: 5,
    name: 'Begüm Yılmaz',
    image: require('../../../assets/media/user.jpg'),
    order: '5',
    confirmed: true,
    badges: [{id: 1, name: 'aile üyesi'}],
  },
];
const {width, height} = Dimensions.get('screen');

const List = () => {
  _renderItem = ({item}) => {
    return (
      <View style={[styles.item, !item.confirmed ? styles.disabled : null]}>
        <View>
          <Image style={styles.image} source={item.image} />
        </View>
        <View style={styles.infoWrap}>
          <View style={styles.userName}>
            <Text style={styles.userOrder}>{item.order}. KİŞİ</Text>
            <Text style={styles.userNameText}>{item.name}</Text>
          </View>
          <View style={styles.badges}>
            {item.badges.map((badge) => {
              return <Badge key={badge.id} badge={badge.name} />;
            })}
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
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
  userName: {   
  },
  badges: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default List;
