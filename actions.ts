import { Background, ImageObject, Position, Presentation, Slide, SlideObject, SolidBackground, TextObject } from "./types"
import { randomUUID } from "crypto"


const rename = (presentation: Presentation, newName: string): Presentation => {
    return { 
        ...presentation, 
        name: newName,
    }
}

const generateGuid = (): string => {
    return randomUUID()
}

const addSlide = (presentation: Presentation, slideId: string): Presentation => {
    const background: SolidBackground = {
        color: 'red',
        type: 'solid'
    }
    const newSlide: Slide = {
        id: slideId,
        background: background,
        objects: [],
        selectedObjectIds: []
    }

    return {...presentation, slides: [...presentation.slides, newSlide]} 
}

const deleteSlide = (presentation: Presentation, slideId: string): Presentation => {
    return {...presentation, slides: presentation.slides.filter(slide => slide.id !== slideId)}
}

const changeSlidePosition = (presentation: Presentation, arraySlideIds: string[]): Presentation => {
    return {...presentation, slides: arraySlideIds.map((item) => presentation.slides[item])}
}

const addTextToSlide = (presentation: Presentation, slideId: string, textForSlide: string, textId: string): Presentation => {
    const searchedSlide: Slide = presentation.slides[slideId]
    const textObjectForSlide: TextObject = { id: textId, position: {X: 0, Y: 0}, text: textForSlide, fontsize: 16, font: 'arial', type: 'text'}
    const editedSlide: Slide = {...searchedSlide, objects: [...searchedSlide.objects, textObjectForSlide]}
    return {...presentation, slides: [...presentation.slides, presentation.slides[slideId] = editedSlide]}
}

const addImageToSlide = (presentation: Presentation, slideId: string, imageForSlide: string, imgId: string): Presentation => {
    const searchedSlide: Slide = presentation.slides[slideId]
    const imageObjectForSlide: ImageObject = { id: imgId, position: {X: 0, Y: 0}, src: imageForSlide, width: 100, height: 100, type: 'image'}
    const editedSlide: Slide = {...searchedSlide, objects: [...searchedSlide.objects, imageObjectForSlide]}
    return {...presentation, slides: [...presentation.slides, presentation.slides[slideId] = editedSlide]}
}

const removeObjectFromSlide = (presentation: Presentation, slideId: string, objId: string): Presentation => {
    const searchedSlide: Slide = presentation.slides[slideId]
    const editedSlide: Slide = {...searchedSlide, objects: searchedSlide.objects.filter((obj) => obj.id !== objId )}
    return {...presentation, slides: [...presentation.slides, presentation.slides[slideId] = editedSlide]}
}

const changeSlideObjectPosition = (presentation: Presentation, slideId: string, objId: string, newPos: Position) => {
    const searchedSlide: Slide = presentation.slides[slideId]
    const searchedObj: SlideObject = searchedSlide.objects[objId]
    const editedObj: SlideObject = {...searchedObj, position: newPos}
    const editedSlide: Slide = {...searchedSlide, objects: [...searchedSlide.objects, searchedSlide[objId] = editedObj]} 
    return {...presentation, slides: [...presentation.slides, presentation.slides[slideId] = editedSlide]}
}

const changeTextSize = (presentation: Presentation, slideId: string, textObjId: string, newFontsize: number): Presentation => {
    const searchedSlide: Slide = presentation.slides[slideId]
    const searchedObj: TextObject = searchedSlide.objects[textObjId]
    const editedObj: TextObject = {...searchedObj, fontsize: newFontsize}
    const editedSlide: Slide = {...searchedSlide, objects: [...searchedSlide.objects, searchedSlide[textObjId] = editedObj]} 
    return {...presentation, slides: [...presentation.slides, presentation.slides[slideId] = editedSlide]}
}

const changeImageSize = (presentation: Presentation, slideId: string, imgObjId: string, newWidth: number, newHeight: number): Presentation => {
    const searchedSlide: Slide = presentation.slides[slideId]
    const searchedObj: ImageObject = searchedSlide.objects[imgObjId]
    const editedObj: ImageObject = {...searchedObj, width: newWidth, height: newHeight}
    const editedSlide: Slide = {...searchedSlide, objects: [...searchedSlide.objects, searchedSlide[imgObjId] = editedObj]} 
    return {...presentation, slides: [...presentation.slides, presentation.slides[slideId] = editedSlide]}
}

const changeText = (presentation: Presentation, slideId: string, textObjId: string, newText: string): Presentation => {
    const searchedSlide: Slide = presentation.slides[slideId]
    const searchedTextObj: TextObject = searchedSlide.objects[textObjId]
    const editeTextdObj: TextObject = {...searchedTextObj, text: newText}
    const editedSlide: Slide = {...searchedSlide, objects: [...searchedSlide.objects, searchedSlide[textObjId] = editeTextdObj]} 
    return {...presentation, slides: [...presentation.slides, presentation.slides[slideId] = editedSlide]}
}

const changeFont = (presentation: Presentation, slideId: string, textObjId: string, newFont: string): Presentation => {
    const searchedSlide: Slide = presentation.slides[slideId]
    const searchedTextObj: TextObject = searchedSlide.objects[textObjId]
    const editeTextdObj: TextObject = {...searchedTextObj, font: newFont}
    const editedSlide: Slide = {...searchedSlide, objects: [...searchedSlide.objects, searchedSlide[textObjId] = editeTextdObj]} 
    return {...presentation, slides: [...presentation.slides, presentation.slides[slideId] = editedSlide]}
}

const changeSlideBackground = (presentation: Presentation, slideId: string, newBackground: Background): Presentation => {
    const searchedSlide: Slide = presentation.slides[slideId]
    const editedSlide: Slide = {...searchedSlide, background: newBackground} 
    return {...presentation, slides: [...presentation.slides, presentation.slides[slideId] = editedSlide]}
}