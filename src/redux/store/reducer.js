import {TYPE_TAG_FETCH, TYPE_TAG_DELETE} from './actions';

const initialState = {
    tags: [],
    searchArray: null,
    searchText: ""
}

export function reducerTag(state = initialState, action){
    //console.log("payload", action.payload)

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
                    console.log("hi", action.payload)
                    return i !== action.payload
                }),
                searchArray: null
            }
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
