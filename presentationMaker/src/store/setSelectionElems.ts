import {EditorType, SelectionElemsType } from "./Actions/EditorType.ts";

function setSelectionElems(editor: EditorType, newSelection: SelectionElemsType): EditorType {
    return {
        ...editor,
        // selectionElems: newSelection,
    }
}

export {
    setSelectionElems,
}