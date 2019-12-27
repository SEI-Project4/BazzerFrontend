import {takeEvery, put, takeLatest, take, call, all} from 'redux-saga/effects'
import fetchData from '../api/getPost'
import {POST} from '../constants'
import {getposts, errorPost} from '../actions/index'

function* handlePostLoad(action){
    try{

        const pageid = action.pageid
        const postdata = yield call(fetchData,pageid)
        // const userToken = yield call(fetchtoken)
        console.log(postdata)
        // console.lgog(userToken)
        yield put(getposts(postdata))
    }catch(error){
        //dispatch error
        console.log('err saga')
        yield put(errorPost(error.toString()))
    }
    
}

export default function* fetchPostData(){
    yield takeEvery(POST.LOAD,handlePostLoad)
}