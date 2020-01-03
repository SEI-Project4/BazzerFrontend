import {takeEvery, put, takeLatest, take, call, all} from 'redux-saga/effects'
import fetchData from '../api/GetUserData'
import {USER} from '../constants'
import {setUser, setError} from '../actions/index'

function* handleUserLoad(action){
    try{

        const pageid = action.pageid
        const userdata = yield call(fetchData,pageid)

        console.log(userdata)

        if(userdata == 'session expired'){
            yield put(setError('session expired'))
        }else{
            yield put(setUser(userdata))
        }
    }catch(error){

        console.log('err saga')
        yield put(setError(error.toString()))
    }
    
}

export default function* fetchUserData(){
    yield takeEvery(USER.LOAD,handleUserLoad)
}