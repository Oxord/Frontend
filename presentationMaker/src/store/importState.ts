import { stateDataType } from "./stateDataType"
import { validate } from "./Validate"

export const importState = (state: stateDataType) => {
    const presentation = JSON.stringify(state)
    const validState = validate(presentation)
    if (validState) {
        // const saveStateToLocalStorage = useSaveStateToLocalStorage()
    }
    else{
        alert('Такую презентацию нельзя импортировать!')
    }
}