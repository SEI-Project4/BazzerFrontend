import {USERTASK} from '../constants/index'

const initState = []

const userTaskReducer = (state = initState, action) =>{
    switch(action.type){
        case USERTASK.LOAD_SUCCESS:
            return action.usertask

    default:
        return state;
    }
}

export default userTaskReducer