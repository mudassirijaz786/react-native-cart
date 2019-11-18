import {SIGNUP} from "../actions/signup"
import { SET_USER, GET_USER } from "../actions/userDetail";


// const setUserState = {
//     email: '',
//     password: '',
//     errorMsg: ''
// }

// const getUserState = {
//     firstname: '',
//     email: ''
// }

export function setProfile(state = [], action){
    switch(action.type) {
        case SET_USER:
            return [ ...state, action.payload]  
        default:
            return state;
    }
}
const initialState = {
    f: '',
    l: '',
    e: ''
}

export function getProfile(state = initialState, action){
    switch(action.type) {
        case GET_USER:
            return [ ...state, action.payload]
        default:
            return state;
    }
}
