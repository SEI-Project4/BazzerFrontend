import {USER} from '../constants/index'

const initState = {
    firstname: '',
    lastname: '',
    tokenuser: '',
    id: '',
    admin: false,
    verified: false,
    description: '',
    profileimg: '',
    city: '',
    isadmin: false,
    isverified: false,
    following: [],
    followers: [],
    purchesedorder: [],
    posts: [],
    comments: [],
    watchlater: [],
    msg: [],
    _id: '',
    email: '',
    password: '',
    phonenumber: '',
    username: '',
    Rating: [],
    createdAt: '',
    updatedAt: '',
    __v: 0
}
// { ... state , ...action.user }
const userReducer = (state = initState, action) =>{
    switch(action.type){
        case USER.LOAD_SUCCESS:
            return { ... state , ...action.user }

    default:
        return state;
    }
}

export default userReducer