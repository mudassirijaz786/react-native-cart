// import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import rootReducer from './reducer'

// let store = createStore(
//   rootReducer,
//   applyMiddleware(thunkMiddleware)
// )

// export {
//   store
// }


// import { applyMiddleware, createStore } from 'redux';

// import thunk from 'redux-thunk';

// import rootReducer from './reducer';

// const middlewares = [thunk];

// export const configureStore=()=>{
//     return createStore(rootReducer, applyMiddleware(...middlewares))
// };



import { applyMiddleware, createStore, combineReducers  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import {reducerTag} from '../reducers/index';
import {cartReducer} from "../reducers/cart"
import { signupReducer } from '../reducers/signup';
import { user, getProfile } from '../reducers/userDetail';
const rootReducer = combineReducers({
    tags: reducerTag,
    carts: cartReducer,
    user
});


const loggerMiddleware = createLogger()

const configureStore = () => {
    return createStore(rootReducer , applyMiddleware(thunkMiddleware , loggerMiddleware)); // createStore accepts onr reducer that can be combine reducers
};

export default configureStore;




