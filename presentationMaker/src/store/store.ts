import { applyMiddleware, createStore } from 'redux' 
import rootReducer from './rootReducer' 

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

const store = createStore(rootReducer, {}, applyMiddleware(saverState, ))

export {
    store
}