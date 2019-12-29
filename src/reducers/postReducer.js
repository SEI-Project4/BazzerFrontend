import {POST} from '../constants/index'

const initState = {
    posts: [],
    description: '',
    postimages: [],
    city: '',
    isapproved: false,
    isopen: false,
    comments: [],
    buyer:[],
    views: 0,
    _id:'',
    title: '',
    startingbid: 0,
    quantity: 0,
    user: '',
    username: '',
    bids:[],
    createdAt:'',
    updatedAt:'',
    __v: 0
}
// action.post
const postReducer = (state = initState, action) =>{
    switch(action.type){
        case POST.LOAD_SUCCESS:
            return action.post

    default:
        return state;
    }
}

export default postReducer