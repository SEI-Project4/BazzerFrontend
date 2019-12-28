import {takeEvery, put, takeLatest, take, call, all} from 'redux-saga/effects'
import fetchTask from '../api/userTask'
import {USERTASK} from '../constants'
import {usertaskerr, setusertask} from '../actions/index'

function* handleUserTaskLoad(action){
    try{

        const state = action.pageid
        const userTaskdata = yield call(fetchTask,state)

        console.log(userTaskdata)
        // console.lgog(userToken)
        yield put(setusertask(userTaskdata))
    }catch(error){
        //dispatch error
        console.log('err usertask saga')
        yield put(usertaskerr(error.toString()))
    }
    
}

export default function* fetchUserTask(){
    yield takeEvery(USERTASK.LOAD,handleUserTaskLoad)
}