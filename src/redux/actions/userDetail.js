export  const  SET_USER= "SET_USER"
export  const  EDIT_USER= "EDIT_USER"

export const setUser=(payload) =>{
    return {
        type: SET_USER,
        payload
    }
}

export const editUser=(payload) =>{
    return {
        type: EDIT_USER,
        payload
    }
}
