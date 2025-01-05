import { combineReducers } from 'redux'
import { titleReducer } from './titleReducer'
import { slidesReducer } from './slidesReducer'

const rootReducer = combineReducers({
    title: titleReducer,
    slides: slidesReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer  