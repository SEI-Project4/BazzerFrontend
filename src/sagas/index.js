import {all, takeEvery} from 'redux-saga/effects'
import UserSaga from './UserSaga'
import PostSaga from './PostSaga'

//watcher Saga
export default function* rootSaga(){
    yield all([
        UserSaga(),
        PostSaga()
    
    ])
    // yield takeEvery(USER.LOAD, handleUserLoad)
}
