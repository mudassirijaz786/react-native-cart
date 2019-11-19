import {SIGNUP} from "../actions/signup"
import { SET_USER, GET_USER } from "../actions/userDetail";



export function user(state = [], action){
    switch(action.type) {
        case SET_USER:
            return [ ...state, action.payload]  
        default:
            return state;
    }
}
