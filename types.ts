type Presentation = {
    name: string
    slides: Slide[]
    selectedSlideId: string
}

type Slide = {
    id: string
    background: Background
    objects: SlideObject[]
    selectedObjectIds: string[]
}


type Background = SolidBackground | ImageBackground

type SolidBackground = {
    color: string
    type: 'solid'
}

type ImageBackground = {
    src: string
    type: 'image'
}

type SlideObject = TextObject | ImageObject | FigureObject

type ObjectBase = {
    id: string
    position: Position
}

type Position = {
    X: number
    Y: number
}

type TextObject = ObjectBase & {
    text: string
    fontsize: number
    font: string    
    type: 'text'
}

type ImageObject = ObjectBase & {
    src: string
    type: 'image'
}

type FigureBase = ObjectBase & {
    color: string
}

type FigureObject = Circle | Reactangle | Triangle

type Circle = FigureBase & {
    radius: number
    type: 'circle'
}

type Reactangle = FigureBase & {
    length: number
    width: number
    type: 'rectangle'
}

type Triangle = FigureBase & {
    pointOne: Position
    pointTwo: Position
    positionThree: Position
    type: 'triangle'
}

//функции 

const rename = (presentation: Presentation, newName: string): Presentation => {
    return { ...presentation, name: newName}
}


const addSlide = (presentation: Presentation): Presentation => {
    const background: SolidBackground = {
        color: 'red',
        type: 'solid'
    }
    const newSlide: Slide = {
        id: 'newID',
        background: background,
        objects: [],
        selectedObjectIds: []
    }

    return {...presentation, slides: [...presentation.slides, newSlide]} 
}

const deleteSlide = (presentation: Presentation, slideId: string): Presentation => {
    return {...presentation, slides: presentation.slides.filter((slide) => slide.id !== slideId)}
}

const changeSlidePosition = (presentation: Presentation): Presentation => {
    
}