import { Dispatch, UnknownAction } from "redux"
import { SlideActionTypes } from "../SlideActionTypes"
import { SlidesAction } from "../SlidesAction"
import { Position, SizeType, SlideType } from "../types"

//change slide
export const addSlide = (): SlidesAction => {
    return {
        type: SlideActionTypes.ADD_SLIDE,
        payload: null
    }
}

export const removeSlide = (selectedSlideId: string): SlidesAction => {
    return {
        type: SlideActionTypes.REMOVE_SLIDE,
        payload: {
            selectedSlideId
        }
    }
}

export const changeBackground = (selectedSlideId: string, value: string, type: 'src' | 'solid'): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_SLIDE_BACKGROUND,
        payload: {
            selectedSlideId, 
            value, 
            type
        }
    }
} 

export const changeSlidePosition = (newOrder: string[]): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_SLIDE_POSITION,
        payload: {
            newOrder
        }    
    }
}

//insert elements
export const insertFigure = (selectedSlideId: string, figureType: 'circle' | 'rectangle' | 'triangle'): SlidesAction => {
    return {
        type: SlideActionTypes.INSERT_FIGURE,
        payload: {
            selectedSlideId, 
            figureType
        }
    }
}

export const insertImage = (selectedSlideId: string, src: string): SlidesAction => {
    return {
        type: SlideActionTypes.INSERT_IMAGE,
        payload: {
            selectedSlideId,
            src
        }
    }
}

const API_KEY = 'yInoT3_rganJbCrJ1Dr8xyG5m2w2bst-lBQpqkdKQs8'
export const importImage = () => {
    return async (dispatch: Dispatch<UnknownAction>) => {
        dispatch({ type: SlideActionTypes.IMPORT_IMAGE })
            await fetch('https://api.unsplash.com/photos/random', {
                headers: {
                    Authorization: `Client-ID ${API_KEY}`,
                },
            }).then( async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                dispatch({ 
                    type: SlideActionTypes.IMPORT_IMAGE_SUCCESS, 
                    payload: {
                        selectedSlideId: '', 
                        data: data
                    }  
                })
            }
            )
            .catch(
                error => {
                    dispatch({ type: SlideActionTypes.IMPORT_IMAGE_FAILURE, payload: error })
                    throw error 
                })
    } 
}

export const insertTextField = (selectedSlideId: string): SlidesAction => { 
    return {
        type: SlideActionTypes.INSERT_TEXT_FIELD,
        payload: {
            selectedSlideId
        }
    }
}

//change elements
export const changeTextFont = (selectedSlideId: string, selectedElemId: string, newFont: string): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_TEXT_FONT,
        payload: {
            selectedSlideId, 
            selectedElemId, 
            newFont
        }
    }
} 

export const removeElement = (selectedSlideId: string, selectedElemId: string): SlidesAction => {
    return {
        type: SlideActionTypes.REMOVE_ELEM,
        payload: {
            selectedSlideId,
            selectedElemId
        }
    }
} 

export const changeTextSize = (selectedSlideId: string, selectedElemId: string, newFontsize: number): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_TEXT_SIZE,
        payload: {
            selectedSlideId,
            selectedElemId,
            newFontsize
        }
    }
} 

export const changeElementColor = (selectedSlideId: string, selectedElemId: string, newColor: string): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_ELEM_COLOR,
        payload: {
            selectedSlideId,
            selectedElemId,
            newColor
        }
    }
} 

export const changeText = (selectedSlideId: string, selectedElemId: string, newText: string): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_TEXT,
        payload: {
            selectedSlideId,
            selectedElemId,
            newText
        }    
    }
}

export const changeElementSize = (selectedSlideId: string, selectedElemId: string, newSize: SizeType): SlidesAction => { 
    return {
        type: SlideActionTypes.CHANGE_ELEM_SIZE,
        payload: {
            selectedSlideId,
            selectedElemId,
            newSize
        }
    }
}

export const changeElementPosition = (selectedSlideId: string, selectedElemId: string, newPos: Position): SlidesAction => { 
    return {
        type: SlideActionTypes.CHANGE_ELEM_POSITION,
        payload: {
            selectedSlideId,
            selectedElemId,
            newPos
        }
    }
}

export const updateSlides = (slides: SlideType[]) => {
    return {
        type: SlideActionTypes.UPDATE_SLIDES,
        payload: {
            slides
        }
    }
}

// export const importImage = () => {
//     return async (dispatch: Dispatch<UnknownAction>) => {
//         dispatch({ type: SlideActionTypes.IMPORT_IMAGE })
//             await fetch('https://api.unsplash.com/photos/random', {
//                 headers: {
//                     Authorization: `Client-ID ${API_KEY}`,
//                 },
//             }).then( async response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok')
//                 }
//                 const data = await response.json()
//                 dispatch({ 
//                     type: SlideActionTypes.IMPORT_IMAGE_SUCCESS, 
//                     payload: {
//                         selectedSlideId: '', 
//                         data: data
//                     }  
//                 })
//             }
//             )
//             .catch(
//                 error => {
//                     dispatch({ type: SlideActionTypes.IMPORT_IMAGE_FAILURE, payload: error })
//                     throw error 
//                 })
//     } 
// }