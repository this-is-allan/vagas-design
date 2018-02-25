import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { firebase as fbConfig } from './config/firebase';

import Header from './components/Header';

import { createStore, compose } from 'redux'
import { reduxFirestore } from 'redux-firestore'
import firebase from 'firebase'
import 'firebase/firestore'
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { reactReduxFirebase } from 'react-redux-firebase';

firebase.initializeApp(fbConfig)
firebase.firestore();

// Add reduxFirestore store enhancer to store creator
// const createStoreWithFirebase = compose(
//     reduxFirestore(firebase, {
//         userProfile: 'users',
//         userFirestoreForProfile: true,
//         enableLogging: false
//     }),
// )(createStore)

const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore)

const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Container>
                <Header />
                <Switch>
                    <Route path='/' component={App} />
                </Switch>
            </Container>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
