import {POSTTASK} from '../constants/index'

const loadingPostTask = (state = false, action) => {
    switch (action.type) {
        case POSTTASK.LOAD:
            return true;
        case POSTTASK.LOAD_SUCCESS:
            return false;
        case POSTTASK.LOAD_FAIL:
            return false;
        default:
            return state;
    }
}

export default loadingPostTask