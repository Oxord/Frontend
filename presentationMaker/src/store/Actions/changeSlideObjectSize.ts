import { EditorType } from "../EditorType"
import { SizeType } from "../types"

function changeSlideObjectSize(editor: EditorType, {slideId, elemId, newSize}: {slideId: string, elemId: string, newSize: SizeType}): EditorType {
    const newEditor = {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => {
                if (slide.id === slideId) {
                    return {
                        ...slide,
                        objects: slide.objects.map(object => {
                            if (object.id === elemId) {
                                return {
                                    ...object,
                                    width: newSize.width,
                                    height: newSize.height
                                }
                            }
                            return object
                        })
                    }
                }
                return slide
            })
        }
    }
    return newEditor
}

export {
    changeSlideObjectSize,
}