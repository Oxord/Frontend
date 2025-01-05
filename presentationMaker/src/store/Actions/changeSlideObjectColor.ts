import { EditorType } from "../EditorType"

function changeSlideObjectColor( 
    editor: EditorType, { slideId, elemId, color }: { slideId: string, elemId: string, color: string }): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => {
                if (slide.id === slideId) {
                    return {
                        ...slide,
                        objects: slide.objects.map(object => {
                            if (object.id === elemId && (
                                object.type === 'text' ||
                                object.type === 'circle' ||
                                object.type === 'rectangle' ||
                                object.type === 'triangle'
                            )) {
                                return {
                                    ...object,
                                    color: color
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
    changeSlideObjectColor,
}