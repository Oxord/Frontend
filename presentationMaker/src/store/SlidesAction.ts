import { SlideActionTypes } from "./SlideActionTypes"
import { Position, SizeType, SlideType } from "./types"


export type RemoveSlidePayload = {
    selectedSlideId: string
}

export type ChangeBackgroundPayload = {
    selectedSlideId: string
    value: string
    type: 'src' | 'solid'
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any
}

export type UpdateSlidesPayload = {
    slides: SlideType[]
}

export type PayloadType = 
    RemoveSlidePayload | 
    ChangeBackgroundPayload | 
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
    UpdateSlidesPayload |
    null

export type SlidesAction = {
    type: SlideActionTypes
    payload: PayloadType
}