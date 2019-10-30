import {TYPE_TAG_FETCH} from './actions';

const initialState = {
    tags: []
}
export function reducerTag(state = initialState, action){
    console.log("payload", action.payload)

    switch(action.type) {
        case TYPE_TAG_FETCH:
            return {
                ...state,
                tags: action.payload
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
