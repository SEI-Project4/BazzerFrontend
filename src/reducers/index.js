import loadingReducer from './loadingReducer'
import errorReducer from './errorReducer'
import userReducer from './userReducer'
import {combineReducers} from 'redux'
import postReducer from './postReducer'
import loadpostReducer from './loadpostReducer'
import userTaskReducer from './userTaskReducer'
import loadingUserTask from './loadingUserTask'
import loadingPostTask from './loadingPostTask'
import postTask from './postTask'
import loadSpostReducer from './loadSpostReducer'
import spostReducer from './spostReducer'


const rootReducer = combineReducers({

    isLoading: loadingReducer,
    user: userReducer,
    error: errorReducer,
    post: postReducer,
    postLoading: loadpostReducer,
    userTaskLoading: loadingUserTask,
    userTask: userTaskReducer,
    postTaskLoading: loadingPostTask,
    postTask: postTask,
    spost: spostReducer,
    spostLoading: loadSpostReducer 
})

export default rootReducer