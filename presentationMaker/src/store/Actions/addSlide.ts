import {EditorType} from "../EditorType.ts";
import { SlideType, SolidBackground } from "../types.ts";

function addSlide(editor: EditorType, {slideId}: {slideId: string}): EditorType {
    const background: SolidBackground = {
        color: 'white',
        type: 'solid'
    }
    const newSlide: SlideType = {
        id: slideId,
        background: background,
        objects: [],
    } 
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, newSlide],
        }
    }
}

export {
    addSlide,
}