
import { generateGuid } from "../actions.ts";
import {EditorType} from "../EditorType.ts";
import { SlideType, TextObject } from "../types.ts";

function insertTextField(editor: EditorType, {selectedSlideId}: {selectedSlideId: string}): EditorType {
    
    const searchedSlide: SlideType | undefined = editor.presentation.slides.find(slide => slide.id === selectedSlideId)
    if (searchedSlide !== undefined){
        const textId = generateGuid()
        const textObjectForSlide: TextObject = { id: textId, position: {X: 150, Y: 300}, text: 'New Text', fontsize: 16, font: 'arial', type: 'text', width: 100, height: 100}
        const editedSlide: SlideType = {...searchedSlide, objects: [...searchedSlide.objects, textObjectForSlide]}
        return {
            ...editor,
            presentation: {
                ...editor.presentation,
                slides: editor.presentation.slides.map(x => {
                    if (x.id === editedSlide.id){
                        return editedSlide
                    }
                    else{
                        return x
                    }
                }),
            },
        }
    }
    else{
        return editor
    }
}

export {
    insertTextField,
}
