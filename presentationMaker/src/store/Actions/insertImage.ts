import { generateGuid } from "../actions"
import { EditorType } from "./EditorType"
import { ImageObject, SlideType } from "../types"

function insertImage(editor: EditorType, {slideId, src}: {slideId: string, src: string}): EditorType {
    const searchedSlide: SlideType | undefined = editor.presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const imageId = generateGuid()
        const imageObjectForSlide: ImageObject = { id: imageId, position: {X: 0, Y: 0}, src: src, width: 150, height: 150, type: 'image'}
        const editedSlide: SlideType = {...searchedSlide, objects: [...searchedSlide.objects, imageObjectForSlide]}
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
    insertImage,
}