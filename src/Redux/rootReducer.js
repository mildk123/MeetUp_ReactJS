import { combineReducers } from 'redux'
import authReducer from './Reducers/authReducer';
import meetingReducer from './Reducers/meetingReducer'
import mapReducer from './Reducers/mapReducer'

export default combineReducers({
    authReducer,
    meetingReducer,
    mapReducer
})
