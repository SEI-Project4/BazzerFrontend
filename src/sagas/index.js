import {all} from 'redux-saga/effects'
import UserSaga from './UserSaga'
// import TokenSaga from './TokenSaga'
import {USER} from '../constants/index'

//watcher Saga
function* rootSaga(){
    yield all([UserSaga()])
    // yield takeEvery(USER.LOAD, handleUserLoad)
}

export default rootSaga