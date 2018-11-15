const updateMyData = myDetails => {
    return {
        type: "UPDATE_MY_DATA",
        payload : myDetails
    }
}

const updateOtherData = otherDetails => {
    return {
        type : 'UPDATE_OTHER_DATA',
        payload: otherDetails
    }
}

const CurrentUserIndex = uid => {
    return {
        type : 'CurrentUserIndex',
        payload: uid
    }
}
export {
    updateMyData,
    updateOtherData,
    CurrentUserIndex
}