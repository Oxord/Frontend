import {EditorType} from "./EditorType.ts";

function renamePresentationTitle(editor: EditorType, {newName}: {newName: string}): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name: newName,
        }
    }
}

export {
    renamePresentationTitle,
}