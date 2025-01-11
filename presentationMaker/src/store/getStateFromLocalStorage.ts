import { stateDataType } from "./stateDataType"
import { validateState } from "./ValidateState"

const KEY = 'presentation'

export const getStateFromLocalStorage = () : stateDataType | null => {
    const content = localStorage.getItem(KEY)
    if (content) {
        const validState = validateState(content)
        if (validState) {
            return validState
        }
        else {
            return null
        }
    } 
    return null
}