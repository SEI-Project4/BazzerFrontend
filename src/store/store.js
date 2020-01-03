import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/index'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas/index'

const configureStore = () => {
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && 
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  )
  sagaMiddleware.run(rootSaga)

  return store
}

// mount it on the Store
export default configureStore


