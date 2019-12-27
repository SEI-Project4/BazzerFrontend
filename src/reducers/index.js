import loadingReducer from './loadingReducer'
import errorReducer from './errorReducer'
import userReducer from './userReducer'
import tokenReducer from './tokenReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    isLoading: loadingReducer,
    user: userReducer,
    error: errorReducer,
    token: tokenReducer,
})

export default rootReducer