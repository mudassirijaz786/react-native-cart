import {TYPE_TAG_FETCH, TYPE_TAG_DELETE, SEARCH_RESULTS} from '../actions/index';
import {searchResults} from '../actions/index'
import _ from 'lodash'
const initialState = {
    tags: [],
    searchArray: [],
    searchText: ''
}

export function reducerTag(state = initialState, action){
    console.log(state.searchArray)
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

        
        console.log("payload", action.payload)
        const searchText = action.payload.trim().toLowerCase()
        return {
           ...state,
            
            searchArray: state.tags.filter(result => {
               if (result.includes(action.payload)){
                    return result
               }
                
                
            })
        };
        default:
            return state;
    }
}
