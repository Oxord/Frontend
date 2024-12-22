import {EditorType, SelectionElemsType } from "./EditorType.ts";

function setSelectionElems(editor: EditorType, newSelection: SelectionElemsType): EditorType {
    return {
        ...editor,
        // selectionElems: newSelection,
    }
}

export {
    setSelectionElems,
}