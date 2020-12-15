import React from 'react';
import {StatusBar, View} from 'react-native';
import Navigation from './src/Navigation/AppStack';
import Providers from './src/Contexts/Providers';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Providers>
        <Navigation />
      </Providers>
    </>
  );
};

export default App;
