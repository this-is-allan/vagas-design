import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    form: formReducer
});

export default rootReducer;