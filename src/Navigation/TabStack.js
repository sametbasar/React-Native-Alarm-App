import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgFromXml} from 'react-native-svg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSlidersH, faUsers} from '@fortawesome/free-solid-svg-icons';
import {Theme, Icons} from '../../contants';
import HomeScreen from '../Screens/Home';
import ContactScreen from '../Screens/Contacts';
import SettingStack from './SettingStack';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: Theme.colors.text,
        activeTintColor: '#66b3ff',
        style: {
          backgroundColor: Theme.colors.white,
          paddingTop: 5,
          height: 80,
          shadowColor: Theme.colors.gray,
          shadowOpacity: 0.25,
          elevation: 3,
        },
        tabStyle: {
          height: 60,
        },
        labelStyle: {
          marginTop: 5,
          fontSize: Theme.sizes.caption,
        },
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Kişiler',
          tabBarIcon: (props) => {
            return <FontAwesomeIcon icon={faUsers} {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Panik',
          tabBarIcon: ({color, focused, size}) => {
            return (
              <SvgFromXml
                width={size}
                height={size}
                fill={color}
                xml={Icons.siren}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{
          title: 'Ayarlar',
          tabBarIcon: (props) => {
            return <FontAwesomeIcon icon={faSlidersH} {...props} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
