import { 
    addImageToSlide,
    addSlide,
    addTextToSlide, 
    changeFont, 
    changeImageSize, 
    changeSlideBackground, 
    changeSlideObjectPosition, 
    changeSlidePosition, 
    changeText, 
    changeFontsize, 
    deleteObjectFromSlide, 
    deleteSlide, 
    generateGuid, rename } from "./actions"
import { Circle, FigureObject, ImageObject, Position, Presentation, Reactangle, Slide, SolidBackground, TextObject, Triangle } from "./types"

describe('Tests', () => {
    const textObj: TextObject = {
        id: generateGuid(), 
        position: {X: 0, Y: 0}, 
        text: 'textObj', 
        font: 'arial',
        fontsize: 16,
        type: 'text' 
    }
    const imgObj: ImageObject = {
        id: generateGuid(),
        position: {X: 150, Y: 150},
        src: 'src',
        width: 200, 
        height: 200,
        type: 'image'
    }
    const circleObj: Circle = {
        id: generateGuid(),
        position: {X: 350, Y: 350},
        color: 'red',
        radius: 20,
        type: 'circle'
    }
    const rectObj: Reactangle = {
        id: generateGuid(),
        position: {X: 350, Y: 350},
        color: 'red',
        width: 10,
        length: 15,
        type: 'rectangle'
    }
    const triangleObj: Triangle = {
        id: generateGuid(),
        position: {X: 350, Y: 350},
        color: 'red',
        pointOne: {X: 370, Y: 370},
        pointTwo: {X: 420, Y: 270},
        positionThree: {X: 270, Y: 270},
        type: 'triangle'
    }
    const firstSlide: Slide = {
        id: generateGuid(),
        background:  {
            color: 'white',
            type: 'solid'
        },
        objects: [textObj, imgObj, circleObj, rectObj, triangleObj],
        selectedObjectIds: [textObj.id, imgObj.id]
    }
    const secondSlide: Slide = {
        id: generateGuid(),
        background:  {
            src: 'src',
            type: 'image'
        },
        objects: [textObj, circleObj, rectObj],
        selectedObjectIds: [circleObj.id, rectObj.id]
    }
    const presentation: Presentation = {
        name: 'PresName', 
        slides: [firstSlide, secondSlide], 
        selectedSlideIds: [secondSlide.id, firstSlide.id]
    }
    const newSlide: Slide = {
        id: generateGuid(),
        background: {
            color: 'white',
            type: 'solid'
        },
        objects: [],
        selectedObjectIds: []
    }
    describe('Test Functions For Presentation Type', () => {
        describe('test rename function', () => {
            const newName: string = 'NewName'
            const renamedPres: Presentation = {
                ...presentation, 
                name: newName
            }
            it('rename presentation', () => {
                expect(rename(presentation, newName)).toEqual(renamedPres)
            })
        })
        describe('test addSlide function', () => {
            const PresentationWithNewSlide: Presentation = {
                ...presentation, 
                slides: [ ...presentation.slides, newSlide ] 
            }
            it('add new slide to presentation', () => {
                expect(addSlide(presentation, newSlide.id)).toEqual(PresentationWithNewSlide)
            })
        })
        describe('test deleteSlide function', () => {
            const PresentationWithNewSlide: Presentation = {
                ...presentation, 
                slides: [ ...presentation.slides, newSlide ] 
            }
            it('delete slide from presentations.slides', () => {
                expect(deleteSlide(PresentationWithNewSlide, newSlide.id).slides).toEqual(presentation.slides)
            })
        })
        describe('test changeSlidePosition function', () => {
            const slideIds = [secondSlide.id, firstSlide.id]
            it('change slides position', () => {
                expect(changeSlidePosition(presentation, slideIds).slides).toEqual([secondSlide, firstSlide])
            })
        })
    })
    describe('Test Functions For Slide Type', () => {
        describe('test addTextToSlide function', () => {
            const newTextObjId = generateGuid()
            const newTextObj: TextObject = { 
                id: newTextObjId,
                position: {X: 0, Y: 0}, 
                text: 'Test', 
                fontsize: 16, 
                font: 'arial', 
                type: 'text'
            }
            const editedSlide: Slide = {
                ...firstSlide, 
                objects: [...firstSlide.objects, newTextObj]
            }
            const editedPres = {
                ...presentation,
                slides: presentation.slides.map(x => {
                    if (x.id === editedSlide.id){
                        return editedSlide
                    }
                    else{
                        return x
                    }})
            }
            it('add text to slide', () => {
                expect(addTextToSlide(presentation, firstSlide.id, newTextObj.text, newTextObj.id)).toEqual(editedPres)
            })  
        })
        describe('test addImageToSlide function', () => {
            const newImg: ImageObject = {
                id: generateGuid(), 
                position: {X: 0, Y: 0}, 
                src: 'src', 
                width: 100, 
                height: 100, 
                type: 'image'
            }
            const editedSlide = {
                ...firstSlide, 
                objects: [...firstSlide.objects, newImg]
            }
            const editedPres = {
                ...presentation,
                slides: presentation.slides.map(x => {
                    if (x.id === editedSlide.id){
                        return editedSlide
                    }
                    else{
                        return x
                    }})
            }
            it('add image to slide', () => {
                expect(addImageToSlide(presentation, firstSlide.id, newImg.src, newImg.id)).toEqual(editedPres)
            })
        })
        describe('test removeObjectFromSlide function', () => {
            const newTextObjId = generateGuid()
            const newTextObj: TextObject = { 
                id: newTextObjId,
                position: {X: 0, Y: 0}, 
                text: 'Test', 
                fontsize: 16, 
                font: 'arial', 
                type: 'text'
            }
            const slideWithText: Slide = {
                ...firstSlide, 
                objects: [...firstSlide.objects, newTextObj]
            }
            const presWithTextOnSlide = {
                ...presentation,
                slides: presentation.slides.map(x => {
                    if (x.id === slideWithText.id){
                        return slideWithText
                    }
                    else{
                        return x
                    }})
            }
            const slideWithoutText: Slide = {
                ...firstSlide, 
                objects: [...firstSlide.objects.filter(slideObj => slideObj.id !== newTextObj.id)]
            }
            const editedPresWithoutTextOnSlide: Presentation = {
                ...presWithTextOnSlide,
                slides: presWithTextOnSlide.slides.map(x => {
                    if (x.id === slideWithoutText.id){
                        return slideWithoutText
                    }
                    else{
                        return x
                    }})
            }
            it('delete text from slide.objects', () => {
                expect(deleteObjectFromSlide(presWithTextOnSlide, firstSlide.id, newTextObj.id)).toEqual(editedPresWithoutTextOnSlide)
            })
            const newImgObjId = generateGuid()
            const newImgObj: ImageObject = { 
                id: newImgObjId,
                position: {X: 0, Y: 0}, 
                src: 'src', 
                width: 150,
                height: 400, 
                type: 'image'
            }
            const slideWithImg: Slide = {
                ...firstSlide, 
                objects: [...firstSlide.objects, newImgObj]
            }
            const presWithImgOnSlide = {
                ...presentation,
                slides: presentation.slides.map(x => {
                    if (x.id === slideWithText.id){
                        return slideWithImg
                    }
                    else{
                        return x
                    }})
            }
            const slideWithoutImg: Slide = {
                ...firstSlide, 
                objects: firstSlide.objects.filter(slideObj => slideObj.id !== newImgObj.id)
            }
            const editedPresWithoutImgOnSlide: Presentation = {
                ...presWithImgOnSlide,
                slides: presWithTextOnSlide.slides.map(x => {
                    if (x.id === slideWithoutImg.id){
                        return slideWithoutImg
                    }
                    else{
                        return x
                    }})
            }
            it('delete img from slide.objects', () => {
                expect(deleteObjectFromSlide(presWithImgOnSlide, slideWithImg.id, newImgObjId)).toEqual(editedPresWithoutImgOnSlide)
            })
        })
        describe('test changeSlideObjectPosition function', () => {
            const newPos: Position = {X: 150, Y: 150}
            const editedObj: FigureObject = {
                ...circleObj, 
                position: newPos
            }
            const editedSlide = {
                ...firstSlide, 
                objects: firstSlide.objects.map(x => {
                    if (x.id === editedObj.id){
                        return editedObj
                    }
                    return x
                })
            }
            const editedPres: Presentation = {
                ...presentation, 
                slides: presentation.slides.map(x => {
                    if(x.id === editedSlide.id){
                        return editedSlide
                    }
                    return x
                })
            }
            it('change object position on slide', () => {
                expect(changeSlideObjectPosition(presentation, firstSlide.id, circleObj.id, newPos)).toEqual(editedPres)
            })
        })
        describe('test changeFontSize function', () => {
            const newFontsize = 25
            const editedObj: TextObject = {
                ...textObj, 
                fontsize: newFontsize
            }
            const editedSlide = {
                ...firstSlide, 
                objects: firstSlide.objects.map(x => {
                    if (x.id === editedObj.id){
                        return editedObj
                    }
                    return x
                })
            }
            const editedPres: Presentation = {
                ...presentation, 
                slides: presentation.slides.map(x => {
                    if(x.id === editedSlide.id){
                        return editedSlide
                    }
                    return x
                })
            }
            it('change fontsize on slide', () => {
                expect(changeFontsize(presentation, firstSlide.id, textObj.id, newFontsize)).toEqual(editedPres)
            })
        })
        describe('test changeImageSize function', () => {
            const newHeight = 200
            const newWidth = 200
            const editedObj: ImageObject = {
                ...imgObj, 
                height: newHeight, 
                width: newWidth
            }
            const editedSlide = {
                ...firstSlide, 
                objects: firstSlide.objects.map(x => {
                    if (x.id === editedObj.id){
                        return editedObj
                    }
                    return x
                })
            }
            const editedPres: Presentation = {
                ...presentation, 
                slides: presentation.slides.map(x => {
                    if(x.id === editedSlide.id){
                        return editedSlide
                    }
                    return x
                })
            }
            it('change object position on slide', () => {
                expect(changeImageSize(presentation, firstSlide.id, imgObj.id, newHeight, newWidth)).toEqual(editedPres)
            })
        })
        describe('test changeText function', () => {
            const newText = 'NewText'
            const editedObj: TextObject = {
                ...textObj, 
                text: newText
            }
            const editedSlide = {
                ...firstSlide, 
                objects: firstSlide.objects.map(x => {
                    if (x.id === editedObj.id){
                        return editedObj
                    }
                    return x
                })
            }
            const editedPres: Presentation = {
                ...presentation, 
                slides: presentation.slides.map(x => {
                    if(x.id === editedSlide.id){
                        return editedSlide
                    }
                    return x
                })
            }
            it('change text in textObj on slide', () => {
                expect(changeText(presentation, firstSlide.id, textObj.id, newText)).toEqual(editedPres)
            })
        })
        describe('test changeFont function', () => {
            const newFont = 'calibri' 
            const editedObj: TextObject = {
                ...textObj, 
                font: newFont
            }
            const editedSlide = {
                ...firstSlide, 
                objects: firstSlide.objects.map(x => {
                    if (x.id === editedObj.id){
                        return editedObj
                    }
                    return x
                })
            }
            const editedPres: Presentation = {
                ...presentation, 
                slides: presentation.slides.map(x => {
                    if(x.id === editedSlide.id){
                        return editedSlide
                    }
                    return x
                })
            }
            it('change text in textObj on slide', () => {
                expect(changeFont(presentation, firstSlide.id, textObj.id, newFont)).toEqual(editedPres)
            })
        })
        describe('test changeSlideBackground function', () => {
            const newBackground: SolidBackground = {
                color: 'red',
                type: 'solid'
            }
            const editedSlide = {
                ...firstSlide, 
                background: newBackground
            }
            const editedPres: Presentation = {
                ...presentation, 
                slides: presentation.slides.map(x => {
                    if(x.id === editedSlide.id){
                        return editedSlide
                    }
                    return x
                })
            }
            it('chage background color', () => {
                expect(changeSlideBackground(presentation, firstSlide.id, newBackground)).toEqual(editedPres)
            })
        })
    })
})