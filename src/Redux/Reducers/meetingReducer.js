const reducer = (state= {}, action) =>{
    switch(action.type) {
        case 'UPDATE_MY_DATA' : {
            return {...state, myDetails : action.payload}
        }
        case 'UPDATE_OTHER_DATA' : {
            return {...state, meetingPerson : action.payload}
        }
        case `CurrentUserIndex` : {
            return {...state, meetingPerson : action.payload}
        }
        default : {
            return state
        }
    }
}

export default reducer
