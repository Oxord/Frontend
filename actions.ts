import { Background, ImageObject, Position, Presentation, Slide, SlideObject, SolidBackground, TextObject } from "./types"
import { randomUUID } from "crypto"

export const generateGuid = (): string => {
    return randomUUID()
}

export const rename = (presentation: Presentation, newName: string): Presentation => {
    return { 
        ...presentation, 
        name: newName,
    }
}

export const addSlide = (presentation: Presentation, slideId: string): Presentation => {
    const background: SolidBackground = {
        color: 'white',
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

export const deleteSlide = (presentation: Presentation, slideId: string): Presentation => {
    return {...presentation, slides: presentation.slides.filter(slide => slide.id !== slideId)}
}

export const changeSlidePosition = (presentation: Presentation, arraySlideIds: string[]): Presentation => {
    const slides: Slide[] = presentation.slides.reduce((acc: Slide[], slide: Slide) => {
        const index = arraySlideIds.indexOf(slide.id);
        acc[index] = slide;
        return acc;
    }, []);
    return {
        ...presentation,
        slides
    }
    return {
        ...presentation,
        slides: presentation.slides.sort((a, b) => {
            return presentation.slides.indexOf(a) - arraySlideIds.indexOf(b.id)
        })
    }
}

export const addTextToSlide = (presentation: Presentation, slideId: string, textForSlide: string, textId: string): Presentation => {
    const searchedSlide: Slide | undefined = presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const textObjectForSlide: TextObject = { id: textId, position: {X: 0, Y: 0}, text: textForSlide, fontsize: 16, font: 'arial', type: 'text'}
        const editedSlide: Slide = {...searchedSlide, objects: [...searchedSlide.objects, textObjectForSlide]}
        return {...presentation, slides: presentation.slides.map(x => {
            if (x.id === editedSlide.id){
                return editedSlide
            }
            else{
                return x
            }
        })}

    }
    return {...presentation}
}

export const addImageToSlide = (presentation: Presentation, slideId: string, imageSrc: string, imgId: string): Presentation => {
    const searchedSlide: Slide | undefined = presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const imageObjectForSlide: ImageObject = { id: imgId, position: {X: 0, Y: 0}, src: imageSrc, width: 100, height: 100, type: 'image'}
        const editedSlide: Slide = {...searchedSlide, objects: [...searchedSlide.objects, imageObjectForSlide]}
        return {...presentation, slides: presentation.slides.map(x => {
            if (x.id === editedSlide.id){
                return editedSlide
            }
            else{
                return x
            }
        })}
    }
    return {...presentation}
}

export const deleteObjectFromSlide = (presentation: Presentation, slideId: string, objId: string): Presentation => {
    const searchedSlide: Slide | undefined = presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const editedSlide: Slide = {...searchedSlide, objects: searchedSlide.objects.filter((obj) => obj.id !== objId )}
        return {...presentation, slides: presentation.slides.map(x => {
            if (x.id === editedSlide.id){
                return editedSlide
            }
            else{
                return x
            }
        })}
    }
    return {...presentation}
}

export const changeSlideObjectPosition = (presentation: Presentation, slideId: string, objId: string, newPos: Position) => {
    const searchedSlide: Slide | undefined = presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const searchedObj: SlideObject | undefined = searchedSlide.objects.find(obj => obj.id === objId)
        if (searchedObj !== undefined){
            const editedObj: SlideObject = {...searchedObj, position: newPos}
            const editedSlide: Slide = {...searchedSlide, objects: searchedSlide.objects.map(x => {
                if (x.id === editedObj.id){
                    return editedObj
                }
                else{
                    return x
                }
            })} 
            return {...presentation, slides: presentation.slides.map(x => {
                if (x.id === editedSlide.id){
                    return editedSlide
                }
                else{
                    return x
                }
            })}
        }
    }
    return {...presentation}
}

export const changeTextSize = (presentation: Presentation, slideId: string, textObjId: string, newFontsize: number): Presentation => {
    const searchedSlide: Slide | undefined = presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const searchedObj: SlideObject | undefined = searchedSlide.objects.find(text => text.id === textObjId)
        if (searchedObj !== undefined && searchedObj.type === 'text'){
            const editedObj: TextObject = {...searchedObj, fontsize: newFontsize}
            const editedSlide: Slide = {...searchedSlide, objects: searchedSlide.objects.map(x => {
                if (x.id === editedObj.id){
                    return editedObj
                }
                else{
                    return x
                }
            })} 
            return {...presentation, slides: presentation.slides.map(x => {
                if (x.id === editedSlide.id){
                    return editedSlide
                }
                else{
                    return x
                }
            })}
        }
    }
    return {...presentation}
}

export const changeImageSize = (presentation: Presentation, slideId: string, imgObjId: string, newWidth: number, newHeight: number): Presentation => {
    const searchedSlide: Slide | undefined = presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const searchedObj: SlideObject | undefined = searchedSlide.objects.find(obj => obj.id === imgObjId)
        if (searchedObj !== undefined && searchedObj.type === 'image'){
            const editedObj: ImageObject = {...searchedObj, width: newWidth, height: newHeight}
            const editedSlide: Slide = {...searchedSlide, objects: searchedSlide.objects.map(x => {
                if (x.id === editedObj.id){
                    return editedObj
                }
                else{
                    return x
                }
            })} 
            return {...presentation, slides: presentation.slides.map(x => {
                if (x.id === editedSlide.id){
                    return editedSlide
                }
                else{
                    return x
                }
            })}
        }
    }
    return {...presentation}
}

export const changeText = (presentation: Presentation, slideId: string, textObjId: string, newText: string): Presentation => {
    const searchedSlide: Slide | undefined = presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const searchedTextObj: undefined | SlideObject = searchedSlide.objects.find(obj => obj.id === textObjId)
        if (searchedTextObj !== undefined && searchedTextObj.type === 'text'){
            const editeTextdObj: TextObject = {...searchedTextObj, text: newText}
            const editedSlide: Slide = {...searchedSlide,  objects: searchedSlide.objects.map(x => {
                if (x.id === editeTextdObj.id){
                    return editeTextdObj
                }
                else{
                    return x
                }
            })} 
            return {...presentation, slides: presentation.slides.map(x => {
                if (x.id === editedSlide.id){
                    return editedSlide
                }
                else{
                    return x
                }
            })}
        }
    }
    return {...presentation}
}

export const changeFont = (presentation: Presentation, slideId: string, textObjId: string, newFont: string): Presentation => {
    const searchedSlide: Slide | undefined = presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const searchedTextObj: SlideObject | undefined = searchedSlide.objects.find(obj => obj.id === textObjId)
        if (searchedTextObj !== undefined && searchedTextObj.type === 'text'){
            const editeTextdObj: TextObject = {...searchedTextObj, font: newFont}
            const editedSlide: Slide = {...searchedSlide, objects: searchedSlide.objects.map(x => {
                if (x.id === editeTextdObj.id){
                    return editeTextdObj
                }
                else{
                    return x
                }
            })} 
            return {...presentation, slides: presentation.slides.map(x => {
                if (x.id === editedSlide.id){
                    return editedSlide
                }
                else{
                    return x
                }
            })}
        }
    }
    return {...presentation}
}

export const changeSlideBackground = (presentation: Presentation, slideId: string, newBackground: Background): Presentation => {
    const searchedSlide: Slide | undefined = presentation.slides.find(slide => slide.id === slideId)
    if (searchedSlide !== undefined){
        const editedSlide: Slide = {...searchedSlide, background: newBackground} 
        return {...presentation, slides: presentation.slides.map(x => {
            if (x.id === editedSlide.id){
                return editedSlide
            }
            else{
                return x
            }
        })}
    }
    return {...presentation}
}