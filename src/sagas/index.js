import {all, takeEvery} from 'redux-saga/effects'
import UserSaga from './UserSaga'
import PostSaga from './PostSaga'
import UserTaskSaga from './UserTaskSaga'

//watcher Saga
export default function* rootSaga(){
    yield all([
        UserSaga(),
        PostSaga(),
        UserTaskSaga()
    ])
    // yield takeEvery(USER.LOAD, handleUserLoad)
}
