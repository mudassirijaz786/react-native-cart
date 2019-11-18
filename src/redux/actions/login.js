
export const LOGIN = 'LOGIN'
export const SET_USER_INFO = 'SET_USET_INFO'
export const FETCH_USER_INFO = 'FETCH_USER_INFO'


export const login = (params, onSuccess, onError) => ({
    type: LOGIN,
    params,
    onSuccess,
    onError
})


export const setUserInfo = (payload) => ({
    type: SET_USER_INFO,
    payload,
})


export const fetchUserInfo = (onSuccess, onError) => ({
    type: FETCH_USER_INFO,
    onSuccess,
    onError
})