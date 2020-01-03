import {POSTTASK} from '../constants/index'

const initState = []

const postTask = (state = initState, action) =>{
    switch(action.type){
        case POSTTASK.LOAD_SUCCESS:
            return action.posttask

    default:
        return state;
    }
}

export default postTask