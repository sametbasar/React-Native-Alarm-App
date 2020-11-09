import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Easing,
  Animated,
  Dimensions,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Icons, Theme} from '../../../contants';
import SplashOne from './SplashOne';
import SplashTwo from './SplashTwo';
import SplashThree from './SplashThree';
import {SvgFromXml} from 'react-native-svg';

const {width, height} = Dimensions.get('window');
const steps = [
  {
    Id: 1,
    render: <SplashOne />,
  },
  {
    Id: 2,
    render: <SplashTwo />,
  },
  {
    Id: 3,
    render: <SplashThree />,
  },
];

const SplashScreen = () => {
  let [scroolX, setScroolX] = useState(new Animated.Value(0));
  const stepPosition = Animated.divide(scroolX, width);
  const navigation = useNavigation();
  AsyncStorage.setItem('@SplashShow','false');

  _renderFlatList = (data, index) => {
    return <View key={index}>{data.item.render}</View>;
  };
  return (
    <View style={styles.container}> 
        <FlatList
          scrollEventThrottle={1}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          scrollEnabled
          data={steps}
          keyExtractor={(item, key) => `item-${key}`}
          renderItem={(data, index) => _renderFlatList(data, index)}
          onScroll={(e) => {
            setScroolX(e.nativeEvent.contentOffset.x);
          }}
        />
        <View style={styles.stepContainer}>
          {steps.map((item, index) => {
            const opacity = stepPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.4, 1, 0.4],
              easing: Easing.linear,
              extrapolate: 'clamp',
            });
            return (
              <Animated.View key={index} style={[styles.step, {opacity}]} />
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Welcome')}
          style={styles.bottomArea}>
          <Text style={styles.bottomText}>Atla</Text>
          <SvgFromXml
            width={40}
            height={25}
            fill={Theme.colors.white}
            xml={Icons.arrowRight}
          />
        </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    width,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: height - 50,
  },
  step: {
    width: 10,
    height: 10,
    marginHorizontal: 3,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.sizes.radius,
  },
  bottomArea: {
    position: 'absolute',
    top: height - 50,
    right: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  jumpSplash: {},
  bottomText: {
    color: Theme.colors.white,
    fontSize: Theme.sizes.base,
    width: 30,
  },
});

export default SplashScreen;
