import React, {useState} from 'react';
import {Text, SafeAreaView, StyleSheet, View, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native"
import {Theme} from '../../../contants';

const HomeScreen = () => {
  let [value, setValue] = useState({
    value: "test",
  });
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={{marginTop: 20}}>
        <View style={styles.div}>
          <Text style={styles.text}>Anasayfa {value.value}</Text>
          <Button
            title="Arttır"
            onPress={() => setValue({value:"değişti"})} />
            <Button title="Sayfa Değiş" onPress={() =>navigation.navigate("Splash")} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  div: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Theme.colors.text,
    fontFamily: Theme.fonts.light,
    fontSize: Theme.sizes.h3,
  },
});

export default HomeScreen;
