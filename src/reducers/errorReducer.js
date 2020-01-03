import { USER, POST, USERTASK, SPOST } from '../constants';

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case USER.LOAD_FAIL:
            return action.error;
        case USER.LOAD:
        case USER.LOAD_SUCCESS:
            return null;
        case POST.LOAD_FAIL:
            return action.error;
        case POST.LOAD:
        case POST.LOAD_SUCCESS:
            return null;
        case SPOST.LOAD_FAIL:
            return action.error;
        case SPOST.LOAD:
        case SPOST.LOAD_SUCCESS:
            return null;
        case USERTASK.LOAD_FAIL:
            return action.error;
        case USERTASK.LOAD:
        case USERTASK.LOAD_SUCCESS:
            return null;

        default:
            return state;
    }
};

export default errorReducer;