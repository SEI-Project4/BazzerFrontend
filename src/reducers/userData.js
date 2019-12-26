import {RECEIVE_USER_DATA} from '../actions'


const initState={
    userData: [],
}

export default (state=initState, {type, userdata}) =>{
    switch(type){
        case RECEIVE_USER_DATA:
            initState.userData.push(userdata)
            return state

    default:
        return state;
    }
}