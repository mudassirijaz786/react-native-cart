import {searchResults} from './index';
export const setSearchText = (event) =>{
    console.log("jh", state.tags.searchArray)
    return dispatch => {
        let searchText = event.nativeEvent.event;
        let data       = state.tags.searchArray;
        
        searchText = searchText.trim().toLowerCase();
        const filteredArray = data.filter(l => {
            return l.toLowerCase().match( searchText );
        })
        const c = searchResults(filteredArray)
        dispatch({
            searchArray: c ,
            searchText: event
            
        })
        if (!searchText || searchText === '')
            dispatch({
                searchArray: null,
            })
        return searchArray

        //console.log("filtered", data)   
    } 
}
