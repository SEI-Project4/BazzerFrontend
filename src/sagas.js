import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {REQUEST_USER_DATA, receiveUserData} from './actions'

import fetchData from './GetUserData'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getUserData(action) {
  
    try {
        // do api call
        // const user = yield call(Api.fetchUser, action.payload.userId);
        const userdata = yield call(fetchData)
        console.log("getting data saga ")
        console.log(userdata)
        yield put(receiveUserData(userdata));
      } catch (e) {
        console.log("error saga ")
        yield put(receiveUserData(" error from redux saga!"));
      }
}
/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* mySaga() {
  yield takeLatest(REQUEST_USER_DATA, getUserData);
}
