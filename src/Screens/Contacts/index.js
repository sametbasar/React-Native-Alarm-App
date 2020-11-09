import React, {useState, useRef} from 'react';
import {Text, Dimensions, StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Theme} from '../../../contants';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Button} from '../../Components/';
import List from './List';
import Loading from './Loading';
import Add from './Add';

const {width, height} = Dimensions.get('screen');

const ContactScreen = () => {
  const [loading, setLoading] = useState(false);
  const ModalizeRef = useRef(null);
  return (
    <>
      <View style={styles.topArea}>
        <View style={styles.topTextArea}>
          <Text style={styles.topText}>
            Acil Durumlarda haberdar edilecek kişiler
          </Text>
          <Button smallButton outline color="gray">
            <Text style={styles.buttonText}>düzenle</Text>
          </Button>
        </View>
      </View>
      {loading ? <Loading /> : <List />}
      <View style={styles.action}>
        <Button
          full
          color="primary"
          outline
          onPress={() => ModalizeRef?.current.open()}>
          <FontAwesomeIcon
            icon={faUserPlus}
            size={24}
            style={{position: 'absolute', left: 25}}
            color={Theme.colors.primary}
          />
          <Text style={styles.actionButtonText}>Yeni Kişi Ekle</Text>
        </Button>
      </View>
      <Modalize modalTopOffset={100} ref={ModalizeRef}>
        <Add modalizeRef={ModalizeRef} />
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  topArea: {
    flex: 0.17,
    paddingTop: 70,
    marginHorizontal: 25,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Theme.colors.gray,
    borderBottomWidth: 1,
  },
  topTextArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topText: {
    width: width / 2.3,
    color: Theme.colors.gray,
    fontSize: Theme.sizes.base,
  },
  buttonText: {
    paddingHorizontal: 15,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.medium,
    fontSize: Theme.sizes.caption,
  },
  action: {
    borderTopColor: Theme.colors.gray,
    borderTopWidth: 1,
    paddingVertical: 25,
    marginVertical: 15,
    paddingHorizontal: 25,
  },
  actionButtonText: {
    color: Theme.colors.primary,
    fontSize: Theme.sizes.base,
    fontFamily: Theme.fonts.bold,
  },
});

export default ContactScreen;
