import { SlideActionTypes } from "./SlideActionTypes"
import { Position, SizeType, SlideType, TextAlign } from "./types"


export type RemoveSlidePayload = {
    selectedSlideId: string
}

export type ChangeBackgroundPayload = {
    selectedSlideId: string
    value: string
    type: 'src' | 'solid'
}

export type GradientTypeValues = 'right' | 'left' | 'top' | 'bottom' | 'top right' | 'top left' | 'bottom right' | 'bottom left'

export type ChangeBackgroundGradientPayload = {
    selectedSlideId: string
    values: string[]
    gradientType: GradientTypeValues
    type: 'gradient'
}

export type ChangeSlidePositionPayload = {
    newOrder: string[]
} 

export type InsertFigurePayload = {
    selectedSlideId: string
    figureType: 'circle' | 'rectangle' | 'triangle'
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

export type ImportImagePayload = {
    selectedSlideId: string
    image: string
}

export type UpdateSlidesPayload = {
    slides: SlideType[]
}

export type ChangeTextAlignPayload = {
    selectedSlideId: string
    selectedElemId: string
    newAlign: TextAlign
}

export type PayloadType = 
    RemoveSlidePayload | 
    ChangeBackgroundPayload | 
    ChangeBackgroundGradientPayload |
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
    ImportImagePayload |
    ChangeTextAlignPayload |
    UpdateSlidesPayload |
    null

export type SlidesAction = {
    type: SlideActionTypes
    payload: PayloadType
}