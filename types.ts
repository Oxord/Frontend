type Presentation = {
    name: string
    slides: Slide[]
}

type Slide = {
    id: string
    slidesObjects: SlideObject[]
    background: Background
    backgroundType: 'solid' | 'image'
}

type SlideObject = {
    obj: TextObject | ImageObject
    type: 'text' | 'image'
}

type Background = {
    type: 'solid' | 'image'
    value: SolidBackground | ImageBackground
}

type ImageObject = {
    src: string
    position: Position
    type: 'image'
}

type TextObject = {
    value: string
    font: string
    fontsize: number
    position: Position
    type: 'image'
}

type SolidBackground = {
    color: string
    type: 'solid'
}

type ImageBackground = {
    src: string
    type: 'image'
}


type Position = {
    X: number
    Y: number
}

type Figure = {
    color: string
    position: Position
    value: Circle | Reactangle 
    type: 'circle' | 'rectangle'
}

type Circle = Figure & {
    radius: number
    type: 'circle'
}

type Reactangle = Figure & {
    length: number
    width: number
    type: 'rectangle'
}

type Triangle = Figure & {
    pointOne: Position
    pointTwo: Position
    positionThree: Position
    type: 'triangle'
}

type selection = {
    selectedSlideId: string 
}

const rename = (presentation: Presentation, newName: string): Presentation => {
    return { ...presentation, name: newName}
}


const addSlide = (presentation: Presentation): Presentation => {
    const newSlide: Slide = {
        id: 'newID',
        labels: [],
        backgroundType: 'solid',
        // background:
    }
    slidesCollection = { ...slidesCollection, slides: [ ...slidesCollection.slides, newSlide ] };
}

const deleteSlide = (slidesCollection: slidesCollection, slide: Slide): void => {
    slidesCollection = { ...slidesCollection, slides: slidesCollection.slides.slice(slidesCollection.slides.indexOf(slide), 1) };
}