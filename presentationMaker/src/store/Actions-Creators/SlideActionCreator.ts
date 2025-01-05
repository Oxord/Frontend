import { SlideActionTypes } from "../SlideActionTypes"
import { SlidesAction } from "../SlidesAction"
import { Position, SizeType } from "../types"

//change slide
export const addSlide = (slideId: string): SlidesAction => {
    return {
        type: SlideActionTypes.ADD_SLIDE,
        payload: slideId
    }
}

export const removeSlide = (slideId: string): SlidesAction => {
    return {
        type: SlideActionTypes.REMOVE_SLIDE,
        payload: slideId
    }
}

export const changeBackgroundColor = (color: string): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_SLIDE_BACKGROUND,
        payload: color
    }
} 
//тут либо вынести в два разных действия (картинка и цвет), либо передавать какой-то флаг того, что мы меняем.

export const changeSlidePosition = (newOrder: string[]): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_TEXT,
        payload: newOrder
    }
}
//тут тоже проблема... и всё из-за payload типа string

//insert elements
export const inserFigure = (figureType: string): SlidesAction => {
    return {
        type: SlideActionTypes.INSERT_FIGURE,
        payload: figureType
    }
}

export const inserImage = (src: string): SlidesAction => {
    return {
        type: SlideActionTypes.INSERT_IMAGE,
        payload: src
    }
}

export const inserTextField = (): SlidesAction => { //тут можно и пустой payload поставить
    return {
        type: SlideActionTypes.INSERT_IMAGE,
        payload: ''
    }
}

//change elements
export const changeTextFont = (newFont: string): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_TEXT_FONT,
        payload: newFont
    }
} 

export const removeElement = (elemId: string): SlidesAction => {
    return {
        type: SlideActionTypes.REMOVE_ELEM,
        payload: elemId
    }
} 

export const changeTextSize = (newSize: number): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_TEXT_SIZE,
        payload: newSize
    }
} 
//тут проблема с payload

export const changeElementColor = (color: string): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_ELEM_COLOR,
        payload: color
    }
} 

export const changeText = (newText: string): SlidesAction => {
    return {
        type: SlideActionTypes.CHANGE_TEXT,
        payload: newText
    }
}

export const changeSlideElementSize = (newSize: SizeType): SlidesAction => { //должно быть так, но будет error:(
    return {
        type: SlideActionTypes.CHANGE_TEXT,
        payload: newSize
    }
}

export const changeSlideElementPosition = (newPos: Position): SlidesAction => { //должно быть так, но будет error:(
    return {
        type: SlideActionTypes.CHANGE_TEXT,
        payload: newPos
    }
}
