import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './src/Navigation/AppStack';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Navigation />
    </>
  );
};

export default App;
