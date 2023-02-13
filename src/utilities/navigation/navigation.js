import {CommonActions} from '@react-navigation/native';
import * as React from 'react';

const navigationRef = React.createRef();

function navigate(routeName, params) {
  navigationRef.current.dispatch(CommonActions.navigate(routeName, {params}));
}

function back() {
  navigationRef.current.dispatch(CommonActions.goBack());
}

export {navigate, back, navigationRef};
