import React from 'react';
import ReactDOM from 'react-dom';
import { firebase as fbConfig } from './config/firebase';
import logger from 'redux-logger'
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase';
import 'firebase/firestore';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

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

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
