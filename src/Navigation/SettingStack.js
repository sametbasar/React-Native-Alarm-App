import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {Icons, Theme} from '../../contants';
import {SvgFromXml} from 'react-native-svg';
import SettingScreen from '../Screens/Settings';
import UserInformationScreen from '../Screens/Settings/UserInformation';

const Setting = createStackNavigator();

const SettingStack = () => {
  return (
    <Setting.Navigator
      screenOptions={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTransparent: true,
        headerTitleStyle: {
          color: Theme.colors.text,
          fontSize: Theme.sizes.h4,
        },
        headerLeft: (props) => _renderHeaderLeft(props),
      }}
      initialRouteName="Setting">
      <Setting.Screen
        name="Setting"
        options={{
          headerShown: false,
        }}
        component={SettingScreen}
      />
      <Setting.Screen
        name="UserInformation"
        options={{
          title: 'Kişisel Bilgilerim',
        }}
        component={UserInformationScreen}
      />
    </Setting.Navigator>
  );
};
const _renderHeaderLeft = (props) => {
  return (
    <>
      {props.canGoBack ? (
        <TouchableOpacity
          {...props}
          style={{
            marginLeft: 15,
            transform: [
              {
                rotate: '180deg',
              },
            ],
          }}>
          <SvgFromXml
            width={25}
            height={25}
            fill={Theme.colors.text}
            xml={Icons.arrowRight}
          />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default SettingStack;
