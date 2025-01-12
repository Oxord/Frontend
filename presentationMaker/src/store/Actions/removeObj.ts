
import {EditorType} from "./EditorType.ts";
import { SlideType } from "../types.ts";

function removeObj(editor: EditorType, {slideId, selectedElemId}: {slideId: string, selectedElemId: string}): EditorType {
    const slide: SlideType | undefined = editor.presentation.slides.find(s => s.id === slideId)
    if (slide === undefined){
        return editor
    }
    else{
        const editedSlide: SlideType = { ...slide, objects: slide.objects.filter(s => s.id !== selectedElemId) }
    
        return {
            presentation: {
                ...editor.presentation,
                slides: editor.presentation.slides.map(x => {
                    if (x.id === editedSlide.id){
                        return editedSlide
                    }
                    else{
                        return x
                    }
                })
            }
        }
    }
}

export {
    removeObj,
}
