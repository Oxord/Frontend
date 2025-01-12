import { EditorType } from "./EditorType"
import { ImageBackground, SlideType } from "../types"

function changeBackgroundImage(editor: EditorType, {slideId, src}: {slideId: string, src: string}): EditorType {
    const searchedSlide: SlideType | undefined = editor.presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const newBack: ImageBackground = { src, type: 'image'}
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
    changeBackgroundImage,
}