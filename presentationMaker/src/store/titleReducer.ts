import { initialData } from "./initialData"
import { TitleAction } from "./TitleAction"
import { TitleActionType } from "./TitleActionType"
import { TitleState } from "./TitleState"
import { getStateFromLocalStorage } from "./getStateFromLocalStorage"

const getInitialState = () => {
    const _state = getStateFromLocalStorage()
    if (_state) {
        return _state.title
    }
    else {
        return initialData.title
    }
}

const titleReducer = (state = getInitialState(), action: TitleAction): TitleState => {
    if (action.type === TitleActionType.CHANGE_PRESENTATION_TITLE) { 
        return action.payload 
    } else { 
        return state 
    } 
}


export{ 
    titleReducer
}