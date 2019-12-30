import {takeEvery, put, takeLatest, take, call, all} from 'redux-saga/effects'
import fetchData from '../api/getSpost'
import {SPOST} from '../constants'
import {getSposts, errorSpost} from '../actions/index'

function* handleSpostLoad(action){
    try{
        const pageid = action.pageid
        console.log('single post SAGA')
        const spostdata = yield call(fetchData,pageid)
        console.log(spostdata)
        yield put(getSposts(spostdata))
    }catch(error){
        console.log('err single post saga')
        yield put(errorSpost(error.toString()))
    }
    
}

export default function* fetchSPostData(){
    yield takeEvery(SPOST.LOAD,handleSpostLoad)
}