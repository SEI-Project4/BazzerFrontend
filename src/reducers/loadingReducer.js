import {USER} from '../constants/index'

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case USER.LOAD:
            return true;
        case USER.LOAD_SUCCESS:
            return false;
        case USER.LOAD_FAIL:
            return false;

        default:
            return state;
    }
}

export default loadingReducer