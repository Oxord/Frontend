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
            if (getLastItem(undoStack)) {
                const undoState = getLastItem(undoStack)
                if (state.slides == undoState.slides && state.title == undoState.title ) {
                    undoStack.pop()
                    redoStack.push(previousState)
            }
            } else if (getLastItem(redoStack)) {
                const redoState = getLastItem(redoStack)
                if (state.slides == redoState.slides && state.title == redoState.title ) {
                    redoStack.pop()
                    undoStack.push(previousState)
            }
            } else {
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
        console.log(getLastItem(redoStack))
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