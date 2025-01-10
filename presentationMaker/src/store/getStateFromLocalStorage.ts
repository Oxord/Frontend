import { stateDataType } from "./stateDataType"
import { validate } from "./Validate"

const KEY = 'presentation'

export const getStateFromLocalStorage = () : stateDataType | null => {
    const content = localStorage.getItem(KEY)
    if (content) {
        const validState = validate(content)
        if (validState) {
            return validState
        }
    } 
    return null
}