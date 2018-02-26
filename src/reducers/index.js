import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import JobsReducer from './reducer_jobs';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
    firestore: firestoreReducer,
    jobs: JobsReducer,
    form: formReducer
});

export default rootReducer;