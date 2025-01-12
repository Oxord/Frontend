import {EditorType, SelectionType} from "./Actions/EditorType.ts";

function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    return {
        ...editor,
        selection: newSelection,
    }
}

export {
    setSelection,
}