
import {SET_USER_INFO} from "../actions/login"


const initialState =  {
    userInfo: {
        email: '',
        password: '',
        errorMsg: ''
    }
    
}

export function loginReducer(state = initialState, action){
    switch(action.type) {
        case SET_USER_INFO:
            return { ...state, ...{ userInfo: action.payload } } 
        default:
            return state;
    }
}
