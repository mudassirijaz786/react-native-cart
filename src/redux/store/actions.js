export const TYPE_TAG_FETCH = 'TYPE_TAG_FETCH';

export const actionTag=(tags) =>{
    return {
        type: TYPE_TAG_FETCH,
        payload: tags
    }
}