import {SIGNUP} from "../actions/signup"
import { SET_USER, EDIT_USER } from "../actions/userDetail";



export function user(state = [], action){
    switch(action.type) {
        case SET_USER:
            return [ ...state, action.payload]  

        case EDIT_USER:
            return [
                action.payload
            ]
        default:
            return state;
    }
}
