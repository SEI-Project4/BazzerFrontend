import { SPOST } from '../constants';

const initState = {
    loaded: false,
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
const spostReducer = (state = initState, action) =>{
    switch(action.type){
        case SPOST.LOAD_SUCCESS:
            return action.spost

    default:
        return state;
    }
}

export default spostReducer