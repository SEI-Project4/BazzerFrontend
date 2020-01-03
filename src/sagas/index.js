import {all, takeEvery} from 'redux-saga/effects'
import UserSaga from './UserSaga'
import PostSaga from './PostSaga'
import UserTaskSaga from './UserTaskSaga'
import PostTaskSaga from './PostTaskSaga'
import SpostSaga from './SpostSaga'

//watcher Saga
export default function* rootSaga(){
    yield all([
        UserSaga(),
        PostSaga(),
        UserTaskSaga(),
        PostTaskSaga(),
        SpostSaga()
    ])
    // yield takeEvery(USER.LOAD, handleUserLoad)
}
