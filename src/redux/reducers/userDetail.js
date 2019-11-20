import { USER_DETAIL } from "../actions/userDetail";



export function user(state = [], action){
    switch(action.type) {
        case USER_DETAIL:
            return [ ...state, action.payload]  
        default:
            return state;
    }
}
