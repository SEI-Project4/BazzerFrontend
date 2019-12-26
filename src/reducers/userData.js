import {RECEIVE_USER_DATA} from '../actions'

export default (state="", {type, text=""}) =>{
    switch(type){
        case RECEIVE_USER_DATA:
            return text

    default:
        return state;
    }
}