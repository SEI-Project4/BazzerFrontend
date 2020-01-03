import {USER, POST, USERTASK, POSTTASK, SPOST} from '../constants/index'

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

const loadPost = pageid => ({
    type: POST.LOAD,
    pageid,
});

const getposts = post => ({
    type: POST.LOAD_SUCCESS,
    post,
});

const errorPost = error => ({
    type: POST.LOAD_FAIL,
    error,
});

const loadSpost = pageid => ({
    type: SPOST.LOAD,
    pageid,
});

const getSposts = spost => ({
    type: SPOST.LOAD_SUCCESS,
    spost,
});

const errorSpost = error => ({
    type: SPOST.LOAD_FAIL,
    error,
});

const loadusertask = pageid => ({
    type: USERTASK.LOAD,
    pageid,
});

const setusertask = usertask => ({
    type: USERTASK.LOAD_SUCCESS,
    usertask,
});

const usertaskerr = error => ({
    type: USERTASK.LOAD_FAIL,
    error,
});

const loadposttask = pageid => ({
    type: POSTTASK.LOAD,
    pageid,
});

const setposttask = posttask => ({
    type: POSTTASK.LOAD_SUCCESS,
    posttask,
});

const posttaskerr = error => ({
    type: POSTTASK.LOAD_FAIL,
    error,
});


export {
    loadUser,
    setUser,
    setError,
    getposts,
    loadPost,
    errorPost,
    loadusertask,
    setusertask,
    usertaskerr,
    loadposttask,
    setposttask,
    posttaskerr,
    loadSpost,
    getSposts,
    errorSpost
}