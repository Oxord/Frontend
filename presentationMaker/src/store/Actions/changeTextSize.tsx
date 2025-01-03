import { EditorType } from "../EditorType"
import { SlideType, TextObject } from "../types"

function changeTextSize(editor: EditorType, {slideId, elemId, newFontSize}: {slideId: string, elemId: string, newFontSize: number}): EditorType {
    console.log(newFontSize)
    const searchedSlide: SlideType | undefined = editor.presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined) {
        const searchedObj = searchedSlide.objects.find(o => o.id === elemId)
        if (searchedObj && searchedObj.type === 'text') {
            const editedObj: TextObject = {...searchedObj, fontsize: newFontSize}
            const editedSlide: SlideType = {...searchedSlide, objects: searchedSlide.objects.map(x => {
                if (x.id === editedObj.id){
                    return editedObj
                }
                else{   
                    return x
                }
            })} 
            return {
                ...editor,
                presentation: {
                    ...editor.presentation,
                    slides: editor.presentation.slides.map(s => {   
                        if (s.id === editedSlide.id){
                            return editedSlide
                        }
                        else{
                            return s
                        }
                    }),
                },
            }
        }
    }
    return editor
}

export {
    changeTextSize,
}