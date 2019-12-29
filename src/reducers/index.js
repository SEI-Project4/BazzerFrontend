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

const rootReducer = combineReducers({

    isLoading: loadingReducer,
    user: userReducer,
    error: errorReducer,
    post: postReducer,
    postLoading: loadpostReducer,
    userTaskLoading: loadingUserTask,
    userTask: userTaskReducer,
    postTaskLoading: loadingPostTask,
    postTask: postTask
})

export default rootReducer