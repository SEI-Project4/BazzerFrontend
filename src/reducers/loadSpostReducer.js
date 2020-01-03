import { SPOST } from '../constants';

const loadSpostReducer = (state = false, action) => {
    switch (action.type) {
        case SPOST.LOAD:
            return true;
        case SPOST.LOAD_SUCCESS:
            return false;
        case SPOST.LOAD_FAIL:
            return false;
        default:
            return state;
    }
}


export default loadSpostReducer