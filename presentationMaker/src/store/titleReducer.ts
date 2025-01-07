import { initialData } from "./initialData"
import { TitleAction } from "./TitleAction"
import { TitleActionType } from "./TitleActionType"
import { TitleState } from "./TitleState"

const titleReducer = (state = initialData.title, action: TitleAction): TitleState => {
    if (action.type === TitleActionType.CHANGE_PRESENTATION_TITLE) { 
        return action.payload 
    } else { 
        return state 
    } 
}


export{ 
    titleReducer
}