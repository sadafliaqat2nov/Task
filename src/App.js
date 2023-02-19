import React from 'react';
import AppContainer from './navigation/AppNavigation';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import * as util from './utilities';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={util.colors.primaryColor}
      />
      <AppContainer />
    </>
  );
};

export default App;
