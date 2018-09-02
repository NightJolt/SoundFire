import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/Containers/App';

import { Provider } from 'react-redux';

import store from './src/Store';
import './src/Globals.js';

const SoundFire = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('SoundFire', () => SoundFire);