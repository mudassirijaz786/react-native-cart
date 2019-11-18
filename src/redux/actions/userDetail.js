export  const  SET_USER= "SET_USER"
export  const  GET_USER= "GET_USER"

export const setUser=(payload) =>{
    return {
        type: SET_USER,
        payload
    }
}
export const getUser=(payload) =>{
    return {
        type: GET_USER,
        payload
    }
}