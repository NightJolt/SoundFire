import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import SongsReducer from './Reducers/SongsReducer';
import SettingsReducer from './Reducers/SettingsReducer';
import StyleReducer from './Reducers/StyleReducer';
import SearchReducer from './Reducers/SearchReducer';
import HeaderReducer from './Reducers/HeaderReducer';
import PlayerReducer from './Reducers/PlayerReducer';
import ContentReducer from './Reducers/ContentReducer';

const store = createStore(
    combineReducers({
        SongsReducer,
        SettingsReducer,
        StyleReducer,
        SearchReducer,
        HeaderReducer,
        PlayerReducer,
        ContentReducer
    }),
    {},
    applyMiddleware(
        thunk,
        promise()
    )
);

export default store;