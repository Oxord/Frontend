import { applyMiddleware, createStore, } from 'redux' 
import rootReducer from './rootReducer' 
import { thunk } from 'redux-thunk'

function saverState({ getState }) {
    const KEY = 'presentation'
    return next => action => {
      const returnValue = next(action)
      const state = getState()
      const presentation = JSON.stringify(state)
      localStorage.setItem(KEY, presentation)  
      return returnValue
    }
}

const store = createStore(rootReducer, undefined, applyMiddleware(saverState, thunk))

export type AppDispatch = typeof store.dispatch

export default store