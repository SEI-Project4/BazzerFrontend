import {USERTASK} from '../constants/index'

const loadingUserTask = (state = false, action) => {
    switch (action.type) {
        case USERTASK.LOAD:
            return true;
        case USERTASK.LOAD_SUCCESS:
            return false;
        case USERTASK.LOAD_FAIL:
            return false;
        default:
            return state;
    }
}

export default loadingUserTask