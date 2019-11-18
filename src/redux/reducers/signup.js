import {SIGNUP} from "../actions/signup"


const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMsgSignup: ''
}


export function signupReducer(state = initialState, action){
    switch(action.type) {
        case SIGNUP:
            return {
                ...state
            }
      
        default:
            return state;
    }
}
