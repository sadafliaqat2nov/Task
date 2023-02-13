import * as React from 'react';
import {View, StatusBar} from 'react-native';
import {navigationRef} from '../utilities/navigation/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import homeScreen from '../pages/home/homeScreen';
import styles from '../styles/index';
import * as util from '../utilities';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
class AppContainer extends React.Component {
  render() {
    return (
      <View style={styles.home.mainView}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={util.colors.primaryColor}
        />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName={'homeScreen'}>
            <Stack.Screen
              name="homeScreen"
              component={homeScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default AppContainer;
