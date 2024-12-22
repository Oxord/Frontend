import { EditorType } from "../EditorType"
import { SlideType, SolidBackground } from "../types"

function changeBackgroundColor(editor: EditorType, {slideId, color}: {slideId: string, color: string}): EditorType {
    const searchedSlide: SlideType | undefined = editor.presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const newBack: SolidBackground = { color, type: 'solid'}
        const editedSlide: SlideType = {...searchedSlide, background: newBack}
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
    changeBackgroundColor,
}