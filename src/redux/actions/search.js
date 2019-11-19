import {searchResults} from './index';
export const setSearchText = (event) =>{
    return dispatch => {
        let searchText = event.nativeEvent.event;
        let data       = state.tags.searchArray;
        
        searchText = searchText.trim().toLowerCase();
        const filteredArray = data.filter(l => {
            return l.toLowerCase().match( searchText );
        })

        dispatch({
            searchArray:  searchResults(filteredArray) ,
            searchText: event
            
        })
        if (!searchText || searchText === '')
            dispatch({
                searchArray: null,
            })
        return searchArray

    } 
}
