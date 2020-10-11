import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import ContactScreen from '../Screens/Contacts';
import SettingsScreen from '../Screens/Settings';
import {Theme} from '../../contants';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: Theme.colors.text,
        activeTintColor: '#66b3ff',
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Kişiler',
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Panik',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Ayarlar',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
