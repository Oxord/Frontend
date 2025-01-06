import { SlideActionTypes } from "./SlideActionTypes"
import { Position, SizeType } from "./types"


export type RemoveSlidePayload = {
    selectedSlideId: string
}

export type ChangeBackgroundColorPayload = {
    selectedSlideId: string
    value: string
    type: 'src' | 'solid'
}

export type ChangeSlidePositionPayload = {
    newOrder: string[]
} 

export type InsertFigurePayload = {
    selectedSlideId: string
    figureType: 'circle' | 'reactagnle' | 'triangle'
}

export type InsertImagePayload = {
    selectedSlideId: string
    src: string
}

export type InsertTextFieldPayload = {
    selectedSlideId: string
}

export type RemoveElemPayload = {
    selectedSlideId: string
    selectedElemId: string
}

export type ChangeTextFontPayload = {
    selectedSlideId: string
    selectedElemId: string
    newFont: string
}

export type ChangeElemColorPayload = {
    selectedSlideId: string
    selectedElemId: string
    newColor: string
}

export type ChangeTextPayload = {
    selectedSlideId: string
    selectedElemId: string
    newText: string
}

export type ChangeTextSizePayload = {
    selectedSlideId: string
    selectedElemId: string
    newFontsize: number
}

export type ChangeElemSizePayload = {
    selectedSlideId: string
    selectedElemId: string
    newSize: SizeType
}

export type ChangeElemPositionPayload = {
    selectedSlideId: string
    selectedElemId: string
    newPos: Position
}

export type PayloadType = 
    RemoveSlidePayload | 
    ChangeBackgroundColorPayload | 
    ChangeSlidePositionPayload | 
    InsertFigurePayload | 
    InsertImagePayload |
    InsertTextFieldPayload |
    RemoveElemPayload |
    ChangeTextFontPayload |
    ChangeElemColorPayload | 
    ChangeTextPayload |
    ChangeTextSizePayload |
    ChangeElemSizePayload | 
    ChangeElemPositionPayload |
    null

export type SlidesAction = {
    type: SlideActionTypes
    payload: PayloadType
}