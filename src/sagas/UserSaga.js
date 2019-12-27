import {takeEvery, put, takeLatest, take, call, all} from 'redux-saga/effects'
import fetchData from '../GetUserData'
import fetchtoken from '../api/getToken'
import {USER} from '../constants'
import {setUser, setError, loadUser} from '../actions/index'

function* handleUserLoad(action){
    try{
        // yield all([
        //     call(fetchData),
        //     call(fetchtoken)
        //   ])
        const pageid = action.pageid
        const userdata = yield call(fetchData,pageid)
        // const userToken = yield call(fetchtoken)
        console.log(userdata)
        // console.lgog(userToken)
        if(userdata == 'session expired'){
            yield put(setError('session expired'))
        }else{
            yield put(setUser(userdata))
        }
    }catch(error){
        //dispatch error
        console.log('err saga')
        yield put(setError(error.toString()))
    }
    
}

export default function* fetchUserData(){
    yield takeEvery(USER.LOAD,handleUserLoad)
}