


const reducer = (state= {}, action) =>{
    switch(action.type) {
        case 'DIRECTION_LOCATION' : {
            return {...state, direction : action.payload}
        }
        default : {
            return state
        }
    }
}


export default reducer