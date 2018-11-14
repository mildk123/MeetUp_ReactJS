import { combineReducers } from 'redux'
import authReducer from './Reducers/authReducer';
import meetingReducer from './Reducers/meetingReducer'

export default combineReducers({
    authReducer,
    meetingReducer
})
