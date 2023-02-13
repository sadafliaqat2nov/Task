import React, {Component} from 'react';
import {Provider} from 'react-redux';
import axios from 'axios';
import store, {persistor} from './store/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';
import * as util from './utilities';
import AppContainer from './navigation/appNavigation';

// create our store
export default class App extends Component {
  constructor(props) {
    super(props);
    // Override Axios Environment for Usage throughout
    axios.defaults.baseURL = util.constants.BASEURL;
    axios.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          if (util.Interceptor.getToken()) {
            config.headers.Authorization = `Bearer ${util.Interceptor.getToken()}`;
          }
        }
        return config;
      },
      error => Promise.reject(error),
    );
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
