import loadingReducer from './loadingReducer'
import errorReducer from './errorReducer'
import userReducer from './userReducer'
import {combineReducers} from 'redux'
import postReducer from './postReducer'
import loadpostReducer from './loadpostReducer'
import userTaskReducer from './userTaskReducer'
import loadingUserTask from './loadingUserTask'

const rootReducer = combineReducers({
    //redux store state names
    isLoading: loadingReducer,
    user: userReducer,
    error: errorReducer,
    post: postReducer,
    postLoading: loadpostReducer.user,
    userTaskLoading: loadingUserTask,
    userTask: userTaskReducer
})

export default rootReducer