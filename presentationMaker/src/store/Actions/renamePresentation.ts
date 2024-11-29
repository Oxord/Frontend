import {EditorType} from "../EditorType.ts";

function renamePresentationTitle(editor: EditorType, {newTitle}: {newTitle: string}): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name: newTitle,
        }
    }
}

export {
    renamePresentationTitle,
}