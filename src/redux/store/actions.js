export const TYPE_TAG_FETCH = 'TYPE_TAG_FETCH';
export const TYPE_TAG_DELETE = 'TYPE_TAG_DELETE'

export const actionTag=(tags) =>{
    return {
        type: TYPE_TAG_FETCH,
        payload: tags
    }
}
export const actionTagDelete=(id) =>{
    return {
        type: TYPE_TAG_DELETE,
        payload: id
    }
}