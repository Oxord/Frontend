export type Presentation = {
    name: string
    slides: Slide[]
    selectedSlideIds: string[]
}

export type Slide = {
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
}

export type Position = {
    X: number
    Y: number
}

export type TextObject = ObjectBase & {
    text: string
    fontsize: number
    font: string    
    type: 'text'
}

export type ImageObject = ObjectBase & {
    src: string
    width: number
    height: number
    type: 'image'
}

export type FigureBase = ObjectBase & {
    color: string
}

export type FigureObject = Circle | Reactangle | Triangle

export type Circle = FigureBase & {
    radius: number
    type: 'circle'
}

export type Reactangle = FigureBase & {
    length: number
    width: number
    type: 'rectangle'
}

export type Triangle = FigureBase & {
    pointOne: Position
    pointTwo: Position
    positionThree: Position
    type: 'triangle'
}
