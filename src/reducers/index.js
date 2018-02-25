import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import JobsReducer from './reducer_jobs';

const rootReducer = combineReducers({
    firestore: firestoreReducer,
    jobs: JobsReducer
});

export default rootReducer;