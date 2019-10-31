import {TYPE_TAG_FETCH, TYPE_TAG_DELETE, SEARCH_RESULTS} from '../actions/index';

const initialState = {
    tags: [],
    searchArray: null,
    searchText: ''
}

export function reducerTag(state = initialState, action){
    switch(action.type) {
        case TYPE_TAG_FETCH:
            return {
                ...state,
                tags: action.payload
            }
        case TYPE_TAG_DELETE:
            return {
                ...state,
                tags: state.tags.filter(i=>{
                    return i !== action.payload
                }),
                searchArray: null
            }
        case SEARCH_RESULTS:
            return action.payload
            
            
        default:
            return state;
    }
}

// //selectors
// export const getTags = (state)=>{
//     console.log("state",state)
//     console.log("state tags", state.tags)
//     return state.tags
// }
