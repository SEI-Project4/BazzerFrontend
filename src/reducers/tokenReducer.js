
const initState = []

const tokenReducer = (state = initState, action) =>{
    switch(action.type){
        case 'GET_TOKEN':
            return action.token

    default:
        return state;
    }
}

export default tokenReducer