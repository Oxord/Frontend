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
    generateGuid, 
    rename } from "../actions"
import { ImageObject, 
    Position, 
    Presentation, 
    Slide, 
    SlideObject, 
    SolidBackground, 
    TextObject } from "../types"

describe('Tests with minimum data', () => {
    describe('Test Functions For Presentation Type', () => {
        const presentation: Presentation = {
            name: 'PresName', 
            slides: [], 
            selectedSlideIds: []
        }
        const newSlideId = generateGuid()
        const background: SolidBackground = {
            color: 'white',
            type: 'solid'
        }
        const newSlide: Slide = {
            id: newSlideId,
            background,
            objects: [],
            selectedObjectIds: []
        }
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
                expect(addSlide(presentation, newSlideId)).toEqual(PresentationWithNewSlide)
            })
        })
        describe('test deleteSlide function', () => {
            const PresentationWithNewSlide: Presentation = {
                ...presentation, 
                slides: [ ...presentation.slides, newSlide ] 
            }
            it('delete slide from presentations.slides', () => {
                expect(deleteSlide(PresentationWithNewSlide, newSlideId).slides).toEqual([])
            })
        })
        describe('test changeSlidePosition function', () => {
            const firstSlideId = newSlide.id
            const secondSlideId = generateGuid()
            const newSlideSecond = {
                ...newSlide, 
                id: secondSlideId
            }
            const presentationWithTwoSlides = {
                ...presentation, 
                slides: [newSlide, newSlideSecond]
            }
            const slideIds = [secondSlideId, firstSlideId]
            it('change slides position', () => {
                expect(changeSlidePosition(presentationWithTwoSlides, slideIds).slides).toEqual([newSlideSecond, newSlide])
            })
        })
    })
    describe('Test Functions For Slide Type', () => {
        const oneSlideId = generateGuid()
        const background: SolidBackground = {
            color: 'black',
            type: 'solid'
        }
        const oneSlide: Slide = {
            id: oneSlideId,
            background: background,
            objects: [],
            selectedObjectIds: []
        }
        const presentation: Presentation = {
            name: "EmptyName", 
            slides: [oneSlide], 
            selectedSlideIds: []
        }
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
                ...oneSlide, 
                objects: [...oneSlide.objects, newTextObj]
            }
            it('add text to slide', () => {
                expect(addTextToSlide(presentation, oneSlideId, newTextObj.text, newTextObj.id).slides).toEqual([editedSlide])
            })  
        })
        describe('test addImageToSlide function', () => {
            const imgId = generateGuid()
            const newImg: ImageObject = {
                id: imgId, 
                position: {X: 0, Y: 0}, 
                src: 'src', 
                width: 100, 
                height: 100, 
                type: 'image'
            }
            const editedSlide = {
                ...oneSlide, 
                objects: [...oneSlide.objects, newImg]
            }
            it('add image to slide', () => {
                expect(addImageToSlide(presentation, oneSlideId, newImg.src, newImg.id).slides).toEqual([editedSlide])
            })
        })
        describe('test removeObjectFromSlide function', () => {
            const ObjId = generateGuid()
            const newTextObj: TextObject = {
                id: ObjId, 
                position: {X: 0, Y: 0}, 
                text: 'ABC', 
                font: 'arial',
                fontsize: 16,
                type: 'text' 
            } 
            const SlideWithText: Slide = {
                id: generateGuid(),
                background: oneSlide.background,
                objects: [newTextObj],
                selectedObjectIds: []  
            }
            const SlideWithoutText = {
                ...SlideWithText, 
                objects: []
            }
            const newPresWithText: Presentation = {
                ...presentation, 
                slides: [SlideWithText]
            }
            it('delete text from slide.objects', () => {
                expect(deleteObjectFromSlide(newPresWithText, SlideWithText.id, newTextObj.id).slides).toEqual([SlideWithoutText])
            })
            const newImgObj: ImageObject = {
                id: ObjId,
                position: {X: 0, Y: 0},
                src: 'src',
                width: 150, 
                height: 150,
                type: 'image'
            }
            const SlideWithImg: Slide = {
                id: generateGuid(),
                background: oneSlide.background,
                objects: [newImgObj],
                selectedObjectIds: []  
            }
            const SlideWithoutImg = {
                ...SlideWithImg, 
                objects: []
            }
            const newPresWithImg: Presentation = {
                ...presentation, 
                slides: [SlideWithImg]
            }
            it('delete img from slide.objects', () => {
                expect(deleteObjectFromSlide(newPresWithImg, SlideWithImg.id, ObjId).slides).toEqual([SlideWithoutImg])
            })
        })
        describe('test changeSlideObjectPosition function', () => {
            const textObjId = generateGuid()
            const newPos: Position = {X: 150, Y: 150}
            const newTextObj: SlideObject = {
                id: textObjId, 
                position: {X: 0, Y: 0}, 
                text: 'ABC', 
                font: 'arial',
                fontsize: 16,
                type: 'text' 
            } 
            const editedTextObj: TextObject = {
                ...newTextObj, position: newPos
            }
            const slideWithText: Slide = {
                id: generateGuid(),
                background: oneSlide.background,
                objects: [newTextObj],
                selectedObjectIds: []  
            }
            const newPresWithText: Presentation = {
                ...presentation, 
                slides: [slideWithText]
            }
            const editedSlide = {
                ...slideWithText, 
                objects: [...oneSlide.objects, editedTextObj]
            }
            
            it('change object position on slide', () => {
                expect(changeSlideObjectPosition(newPresWithText, slideWithText.id, textObjId, newPos).slides).toEqual([editedSlide])
            })
        })
        describe('test changeTextSize function', () => {
            const textObjId = generateGuid()
            const newTextSize = 25
            const newTextObj: SlideObject = {
                id: textObjId, 
                position: {X: 0, Y: 0}, 
                text: 'ABC', 
                font: 'arial',
                fontsize: 16,
                type: 'text' 
            } 
            const editedTextObj: TextObject = {
                ...newTextObj, fontsize: newTextSize
            }
            const slideWithText: Slide = {
                id: generateGuid(),
                background: oneSlide.background,
                objects: [newTextObj],
                selectedObjectIds: []  
            }
            const newPresWithText: Presentation = {
                ...presentation, 
                slides: [slideWithText]
            }
            const editedSlide = {
                ...slideWithText, 
                objects: [...oneSlide.objects, editedTextObj]
            }
            it('change fontsize on slide', () => {
                expect(changeFontsize(newPresWithText, slideWithText.id, textObjId, newTextSize).slides).toEqual([editedSlide])
            })
        })
        describe('test changeImageSize function', () => {
            const objId = generateGuid()
            const newHeight = 200
            const newWidth = 200
            const newImgObj: ImageObject = {
                id: objId,
                position: {X: 0, Y: 0},
                src: 'src',
                width: 150, 
                height: 150,
                type: 'image'
            }
            const editedImgObj: ImageObject = {
                ...newImgObj, height: newHeight, width: newWidth
            }
            const slideWithImg: Slide = {
                id: generateGuid(),
                background: oneSlide.background,
                objects: [newImgObj],
                selectedObjectIds: []  
            }
            const editedSlide = {
                ...slideWithImg, 
                objects: [editedImgObj]
            }
            const newPresWithImg: Presentation = {
                ...presentation, 
                slides: [slideWithImg]
            }
            it('change object position on slide', () => {
                expect(changeImageSize(newPresWithImg, slideWithImg.id, newImgObj.id, newHeight, newWidth).slides).toEqual([editedSlide])
            })
        })
        describe('test changeText function', () => {
            const textObjId = generateGuid()
            const newText = 'NewText'
            const newTextObj: SlideObject = {
                id: textObjId, 
                position: {X: 0, Y: 0}, 
                text: 'ABC', 
                font: 'arial',
                fontsize: 16,
                type: 'text' 
            } 
            const editedTextObj: TextObject = {
                ...newTextObj, text: newText
            }
            const slideWithText: Slide = {
                id: generateGuid(),
                background: oneSlide.background,
                objects: [newTextObj],
                selectedObjectIds: []  
            }
            const newPresWithText: Presentation = {
                ...presentation, 
                slides: [slideWithText]
            }
            const editedSlide = {
                ...slideWithText, 
                objects: [...oneSlide.objects, editedTextObj]
            }
            it('change text in textObj on slide', () => {
                expect(changeText(newPresWithText, slideWithText.id, textObjId, newText).slides).toEqual([editedSlide])
            })
        })
        describe('test changeFont function', () => {
            const textObjId = generateGuid()
            const newFont = 'calibri' 
            const newTextObj: SlideObject = {
                id: textObjId, 
                position: {X: 0, Y: 0}, 
                text: 'ABC', 
                font: 'arial',
                fontsize: 16,
                type: 'text' 
            } 
            const editedTextObj: TextObject = {
                ...newTextObj, font: newFont
            }
            const slideWithText: Slide = {
                id: generateGuid(),
                background: oneSlide.background,
                objects: [newTextObj],
                selectedObjectIds: []  
            }
            const newPresWithText: Presentation = {
                ...presentation, 
                slides: [slideWithText]
            }
            const editedSlide = {
                ...slideWithText, 
                objects: [...oneSlide.objects, editedTextObj]
            }
            it('change text in textObj on slide', () => {
                expect(changeFont(newPresWithText, slideWithText.id, textObjId, newFont).slides).toEqual([editedSlide])
            })
        })
        describe('test changeSlideBackground function', () => {
            const newBackground: SolidBackground = {
                color: 'red',
                type: 'solid'
            }
            const editedSlide: Slide = {...oneSlide, background: newBackground}
            it('chage background color', () => {
                expect(changeSlideBackground(presentation, oneSlideId, newBackground).slides).toEqual([editedSlide])
            })
        })
    })
})