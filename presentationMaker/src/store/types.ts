export type Presentation = {
    name: string
    slides: SlideType[]
    selectedSlideIds: string[]
}

export type SlideType = {
    id: string
    background: Background
    objects: SlideObject[]
    selectedObjectIds: string[]
}

export type Background = SolidBackground | ImageBackground

export type SolidBackground = {
    color: string
    type: 'solid'
}

export type ImageBackground = {
    src: string
    type: 'image'
}

export type SlideObject = TextObject | ImageObject | FigureObject

export type ObjectBase = {
    id: string
    position: Position
    width: number
    height: number
}

export type Position = {
    X: number
    Y: number
}

export type SizeType = {
    width: number
    height: number
}

export type TextObject = ObjectBase & {
    text: string
    fontsize: number
    font: string    
    type: 'text'
}

export type ImageObject = ObjectBase & {
    src: string
    type: 'image'
}

export type FigureBase = ObjectBase & {
    color: string
}

export type FigureObject = Circle | Reactangle | Triangle

type FigureType = FigureObject['type']

export type Circle = FigureBase & {
    radius: number
    type: 'circle'
}

export type Reactangle = FigureBase & {
    type: 'rectangle'
}

export type Triangle = FigureBase & {
    pointOne: Position
    pointTwo: Position
    pointThree: Position
    type: 'triangle'
}

export type {
    FigureType,
    
}
