import { EditorType } from "../EditorType"
import { Position } from "../types"

function changeSlideObjectPosition(editor: EditorType, {selectedSlideId, elemId, newPos}: {selectedSlideId: string, elemId: string, newPos: Position}): EditorType {
    const objectId = elemId
    const position = newPos
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
                                    position: position
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
    changeSlideObjectPosition,
}