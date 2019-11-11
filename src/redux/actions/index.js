export const TYPE_TAG_FETCH = 'TYPE_TAG_FETCH';
export const TYPE_TAG_DELETE = 'TYPE_TAG_DELETE'
export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"

// export const ADD_TO_CART  = "ADD_TO_CART"
// export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const actionTag=(tags) =>{
    return {
        type: TYPE_TAG_FETCH,
        payload: tags
    }
}

export const actionTagDelete=(payload) =>{
    return {
        type: TYPE_TAG_DELETE,
        payload,
    }
}

export const searchResults = (payload) => {
    return {
      type: SEARCH_RESULTS,
      payload,
    }
  }
export const addToList = (payload) =>{
    return{
        type: ADD_TO_CART,
        payload
    }
}
export const removeFromList = (payload) =>{
    return{
        type: REMOVE_FROM_CART,
        payload
    }
}