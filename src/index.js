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
import JobsNew from './components/Jobs/JobsNew';

firebase.initializeApp(fbConfig)
firebase.firestore();

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
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
                    <Route path='/jobs/new' component={JobsNew} />
                    <Route path='/' component={App} />
                </Switch>
            </Container>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
