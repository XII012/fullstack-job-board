import { combineReducers } from 'redux';
import clickReducer from './clickReducer';
import usernameReducer from './usernameReducer'

export default combineReducers({
    username: usernameReducer,
    clickCount: clickReducer,
})