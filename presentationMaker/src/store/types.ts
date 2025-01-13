export type Presentation = {
    name: string
    slides: SlideType[]
}

export type SlideType = {
    id: string
    background: Background
    objects: SlideObject[]
}

export type Background = SolidBackground | ImageBackground | GradientBackground

export type SolidBackground = {
    color: string
    type: 'solid'
}

export type ImageBackground = {
    src: string
    type: 'image'
}

export type GradientBackground = {
    color1: string
    color2: string
    gradientType: string
    type: 'gradient'
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
    color: string   
    type: 'text'
}

export type ImageObject = ObjectBase & {
    src: string
    type: 'image'
}

export type FigureBase = ObjectBase & {
    color: string
}

export type FigureObject = Circle | Rectangle | Triangle

export type FigureType = FigureObject['type']

export type Circle = FigureBase & {
    radius: number
    type: 'circle'
}

export type Rectangle = FigureBase & {
    type: 'rectangle'
}

export type Triangle = FigureBase & {
    pointOne: Position
    pointTwo: Position
    pointThree: Position
    type: 'triangle'
}