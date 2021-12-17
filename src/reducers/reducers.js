import { combineReducers } from 'redux';
import jobReducer from './jobReducer';
import usernameReducer from './usernameReducer'

export default combineReducers({
    username: usernameReducer,
    job: jobReducer,
})