import {POST} from '../constants/index'

const initState = []

const postReducer = (state = initState, action) =>{
    switch(action.type){
        case POST.LOAD_SUCCESS:
            return action.post

    default:
        return state;
    }
}

export default postReducer