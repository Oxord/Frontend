import { EditorType } from "../EditorType"
import { SlideType, TextObject } from "../types"

function changeText(editor: EditorType, {slideId, elemId, newText}: {slideId: string, elemId: string, newText: string}): EditorType {
    const searchedSlide: SlideType | undefined = editor.presentation.slides.find(slide => slide.id === slideId)
    console.log('searchedSlide = ', searchedSlide)
    console.log(elemId)
    if (searchedSlide !== undefined) {
        const searchedObj = searchedSlide.objects.find(o => o.id === elemId)
        console.log(searchedObj)
        if (searchedObj && searchedObj.type === 'text') {
            const editedObj: TextObject = {...searchedObj, text: newText}
            console.log('editedObj.text = ', editedObj.text)
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
    changeText
}