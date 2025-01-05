import { TitleAction } from "./TitleAction"
import { TitleActionType } from "./TitleActionType"
import { TitleState } from "./TitleState"

const titleReducer = (state = '', action: TitleAction): TitleState => {
    if (action.type === TitleActionType.CHANGE_PRESENTATION_TITLE) { 
        console.log(state)
        return action.payload 
    } else { 
        return state 
    } 
}


export{ 
    titleReducer
}