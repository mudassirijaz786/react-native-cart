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



import { applyMiddleware, createStore, combineReducers /*heplfull for more reducers*/ } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
// importing all reducers as many as we can have , in our case its one
import {reducerTag} from '../reducers/index';

const rootReducer = combineReducers({
    tags: reducerTag,
    
});

//const middlewares = [thunk];
const loggerMiddleware = createLogger()

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunkMiddleware , loggerMiddleware)); // createStore accepts onr reducer that can be combine reducers
};

export default configureStore;

