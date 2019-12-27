import loadingReducer from './loadingReducer'
import errorReducer from './errorReducer'
import userReducer from './userReducer'
import {combineReducers} from 'redux'
import postReducer from './postReducer'
import loadpostReducer from './loadpostReducer'

const rootReducer = combineReducers({
    //redux store state names
    isLoading: loadingReducer,
    user: userReducer,
    error: errorReducer,
    post: postReducer,
    postLoading: loadpostReducer
})

export default rootReducer