import { EditorType } from "../EditorType"
import { SizeType } from "../types"

function changeSlideObjectSize(editor: EditorType, {selectedSlideId, elemId, newSize}: {selectedSlideId: string, elemId: string, newSize: SizeType}): EditorType {
    const objectId = elemId
    const size = newSize
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => {
                if (slide.id === selectedSlideId) {
                    return {
                        ...slide,
                        objects: slide.objects.map(object => {
                            if (object.id === objectId ) {
                                return {
                                    ...object,
                                    width: size.width,
                                    height: size.height
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
}

export {
    changeSlideObjectSize,
}