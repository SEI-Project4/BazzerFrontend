import { USER } from '../constants';

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case USER.LOAD_FAIL:
            return action.error;
        case USER.LOAD:
        case USER.LOAD_SUCCESS:
            return null;

        default:
            return state;
    }
};

export default errorReducer;