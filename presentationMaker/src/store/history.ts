import { Store } from "redux"
import { stateDataType } from "./stateDataType"

type HistoryType = {
    undo: () => stateDataType | undefined,
    redo: () => stateDataType | undefined,
}

function getLastItem(stack: stateDataType[]): stateDataType {
    return stack[stack.length - 1]
} 

function initHistory(store: Store): HistoryType {
    const undoStack: stateDataType[] = []
    let redoStack: stateDataType[] = []

    let previousState = store.getState()
    store.subscribe(() => {
        const state: stateDataType = store.getState()
        if (!undoStack.length || previousState != state) {
            if (getLastItem(undoStack) && state.slides == getLastItem(undoStack).slides && state.title == getLastItem(undoStack).title) {
                undoStack.pop()
                redoStack.push(previousState)
            }
            else if (getLastItem(redoStack) && state.slides == getLastItem(redoStack).slides && state.title == getLastItem(redoStack).title) {
                redoStack.pop() 
                undoStack.push(previousState)
            } 
            else {
                undoStack.push(previousState)
                redoStack = []
            }
        }
        previousState = state
    })

    function undo() {
        return getLastItem(undoStack)
    }

    function redo() {
        return getLastItem(redoStack)
    }

    return {
        undo,
        redo,
    }
}

export {
    type HistoryType,
    initHistory
}