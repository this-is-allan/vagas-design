import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Container } from 'semantic-ui-react';
import { firebase as fbConfig } from './config/firebase';
import logger from 'redux-logger'
import createBrowserHistory from 'history/createBrowserHistory'

import Header from './components/Header';

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase';
import 'firebase/firestore';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import JobsNew from './components/Jobs/JobsNew';
import SignUp from './components/Auth/SignUp';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import JobsIndex from './components/Jobs/JobsIndex';
import Home from './components/Home';

firebase.initializeApp(fbConfig)
firebase.firestore();

const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase, rrfConfig),
    applyMiddleware(thunk),
    applyMiddleware(logger)
)(createStore)

const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
