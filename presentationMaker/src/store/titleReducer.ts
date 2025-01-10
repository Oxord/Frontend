import { initialData } from "./initialData"
import { TitleAction } from "./TitleAction"
import { TitleActionType } from "./TitleActionType"
import { TitleState } from "./TitleState"
import { getStateFromLocalStorage } from "./getStateFromLocalStorage"

let initialState
const _stateLocal = getStateFromLocalStorage()
if (_stateLocal) {
    initialState = _stateLocal.title
}
else{
    initialState = initialData.title
}

const titleReducer = (state = initialState, action: TitleAction): TitleState => {
    if (action.type === TitleActionType.CHANGE_PRESENTATION_TITLE) { 
        return action.payload 
    } else { 
        return state 
    } 
}


export{ 
    titleReducer
}