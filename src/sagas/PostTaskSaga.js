import {takeEvery, put, takeLatest, take, call, all} from 'redux-saga/effects'
import fetchTask from '../api/postTask'
import {POSTTASK} from '../constants'
import {posttaskerr, setposttask} from '../actions/index'

function* handlePostTaskLoad(action){
    try{

        const state = action.pageid
        const postTaskdata = yield call(fetchTask,state)

        console.log(postTaskdata)

        yield put(setposttask(postTaskdata))
    }catch(error){

        console.log('err posttask saga')
        yield put(posttaskerr(error.toString()))
    }
    
}

export default function* fetchPostTask(){
    yield takeEvery(POSTTASK.LOAD,handlePostTaskLoad)
}