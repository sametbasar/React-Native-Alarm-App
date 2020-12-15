import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {Icons, Theme} from '../../contants';
import {SvgFromXml} from 'react-native-svg';
import TabStack from './TabStack';
import SplashScreen from '../Screens/Splash';
import WelcomeScreen from '../Screens/Welcome';
import RegisterScreen from '../Screens/Register';
import LoginScreen from '../Screens/Login';
import Loading from '../Screens/Loading';
import Api from './../Repository/Api';
import {IsValidTokenService} from '../Enums/config';
import AuthContext from '../Contexts/AuthContext';
import ApiBase from '../Repository/ApiBase';

const App = createStackNavigator();

const AppStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [StartScreen, setStartScreen] = useState('Splash');

  checkUserState(isLoading, setIsLoading, setStartScreen);

  return isLoading ? Loading() : NavigationStack(StartScreen);
};

const checkUserState = async (isLoading, setIsLoading, setStartScreen) => {
  const auth = useContext(AuthContext);
  const splashStorage = await AsyncStorage.getItem('@SplashShow');
  const authToken = await AsyncStorage.getItem('AuthToken');
  const loading = isLoading;

  if (authToken && loading) {
    const api = new Api();
    ApiBase.defaults.headers['authorization'] = authToken;
    const {data} = await api.get(IsValidTokenService);
    if (data.Success) {
      auth.updateUser(data.Data);
      setStartScreen('Home');
    } else {
      setStartScreen('Welcome');
    }
    setIsLoading(false);
  } else if (splashStorage === 'false') {
    setStartScreen('Welcome');
  } else {
    setStartScreen('Splash');
  }
  setIsLoading(false);
};

const NavigationStack = (StartScreen) => {
  return (
    <NavigationContainer>
      <App.Navigator
        screenOptions={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
          headerTransparent: true,
          headerTitleStyle: {
            color: Theme.colors.text,
            fontSize: Theme.sizes.h4,
          },
          headerLeft: (props) => _renderHeaderLeft(props),
        }}
        initialRouteName={StartScreen}>
        <App.Screen name="Home" component={TabStack} />
        <App.Screen name="Splash" component={SplashScreen} />
        <App.Screen name="Welcome" component={WelcomeScreen} />
        <App.Screen
          name="Register"
          options={{headerShown: true, title: 'Yeni Üye'}}
          component={RegisterScreen}
        />
        <App.Screen
          name="Login"
          options={{headerShown: true, title: 'Üye Girişi'}}
          component={LoginScreen}
        />
      </App.Navigator>
    </NavigationContainer>
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

export default AppStack;
