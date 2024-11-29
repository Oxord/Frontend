
import {EditorType} from "../EditorType.ts";

function deleteSlide(editor: EditorType, slideId: string): EditorType {
    if (editor.presentation.slides.length === 1) {
        return editor
    }

    const newSlides = editor.presentation.slides.filter(slide => slide.id !== slideId)

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export {
    deleteSlide,
}
