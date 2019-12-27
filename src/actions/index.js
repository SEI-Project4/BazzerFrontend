import {USER} from '../constants/index'

const loadUser = pageid =>({
    type: USER.LOAD,
    pageid,
})

const setUser = user => ({
    type: USER.LOAD_SUCCESS,
    user,
});

const setError = error => ({
    type: USER.LOAD_FAIL,
    error,
});

const getToken = token => ({
    type: 'GET_TOKEN',
    token,
});


export {
    loadUser,
    setUser,
    setError,
    getToken
}