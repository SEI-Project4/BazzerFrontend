import {USER} from '../constants/index'

const initState = []

const userReducer = (state = initState, action) =>{
    switch(action.type){
        case USER.LOAD_SUCCESS:
            return action.user

    default:
        return state;
    }
}

export default userReducer