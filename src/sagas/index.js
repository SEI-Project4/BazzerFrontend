import {all, takeEvery} from 'redux-saga/effects'
import UserSaga from './UserSaga'
import PostSaga from './PostSaga'
import UserTaskSaga from './UserTaskSaga'
import PostTaskSaga from './PostTaskSaga'

//watcher Saga
export default function* rootSaga(){
    yield all([
        UserSaga(),
        PostSaga(),
        UserTaskSaga(),
        PostTaskSaga()
    ])
    // yield takeEvery(USER.LOAD, handleUserLoad)
}
