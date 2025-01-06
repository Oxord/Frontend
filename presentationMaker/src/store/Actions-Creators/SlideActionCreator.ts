import { SlideActionTypes } from "../SlideActionTypes"
import { SlidesAction } from "../SlidesAction"
import { Position, SizeType } from "../types"

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

export const changeBackgroundColor = (selectedSlideId: string, value: string, type: 'src' | 'solid'): SlidesAction => {
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
        type: SlideActionTypes.CHANGE_TEXT,
        payload: {
            newOrder
        }    
    }
}

//insert elements
export const inserFigure = (selectedSlideId: string, figureType: 'circle' | 'reactagnle' | 'triangle'): SlidesAction => {
    return {
        type: SlideActionTypes.INSERT_FIGURE,
        payload: {
            selectedSlideId, 
            figureType
        }
    }
}

export const inserImage = (selectedSlideId: string, src: string): SlidesAction => {
    return {
        type: SlideActionTypes.INSERT_IMAGE,
        payload: {
            selectedSlideId,
            src
        }
    }
}

export const inserTextField = (selectedSlideId: string): SlidesAction => { 
    return {
        type: SlideActionTypes.INSERT_IMAGE,
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

export const changeSlideElementSize = (selectedSlideId: string, selectedElemId: string, newSize: SizeType): SlidesAction => { 
    return {
        type: SlideActionTypes.CHANGE_TEXT,
        payload: {
            selectedSlideId,
            selectedElemId,
            newSize
        }
    }
}

export const changeSlideElementPosition = (selectedSlideId: string, selectedElemId: string, newPos: Position): SlidesAction => { 
    return {
        type: SlideActionTypes.CHANGE_TEXT,
        payload: {
            selectedSlideId,
            selectedElemId,
            newPos
        }
    }
}
