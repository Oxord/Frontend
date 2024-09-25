import { addImageToSlide, addSlide, addTextToSlide, changeFont, changeImageSize, changeSlideBackground, changeSlideObjectPosition, changeSlidePosition, changeText, changeTextSize, deleteObjectFromSlide, deleteSlide, generateGuid, rename } from "./actions"
import { ImageObject, Position, Presentation, Slide, SolidBackground, TextObject } from "./types"

describe('Tests', () => {
    describe('Test Functions For Presentation Type', () => {
        const presentation: Presentation = {name: 'PresName', slides: [], selectedSlideIds: []}
        const newSlideId = generateGuid()
            const background: SolidBackground = {
                color: 'white',
                type: 'solid'
            }
            const newSlide: Slide = {
                id: newSlideId,
                background: background,
                objects: [],
                selectedObjectIds: []
            }
        describe('test rename function', () => {
            const newName: string = 'NewName'
            const renamedPres: Presentation = {...presentation, name: newName}
            it('rename presentation', () => {
                expect(rename(presentation, newName)).toEqual(renamedPres)
            })
        })
        describe('test addSlide function', () => {
            
            const PresentationWithNewSlide: Presentation = {...presentation, slides: [ ...presentation.slides, newSlide ] }
            it('add new slide to presentation', () => {
                expect(addSlide(presentation, newSlideId)).toEqual(PresentationWithNewSlide)
            })
        })
        describe('test deleteSlide function', () => {
            const PresentationWithNewSlide: Presentation = {...presentation, slides: [ ...presentation.slides, newSlide ] }
            it('delete slide from presentations.slides', () => {
                expect(deleteSlide(PresentationWithNewSlide, newSlideId).slides).toEqual([])
            })
        })
        describe('test changeSlidePosition function', () => {
            const firstSlideId = newSlide.id
            const secondSlideId = generateGuid()
            const newSlideSecond = {...newSlide, id: secondSlideId}
            const presentationWithTwoSlides = {...presentation, slides: [newSlide, newSlideSecond]}
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
        const presentation: Presentation = {name: "EmptyName", slides: [oneSlide], selectedSlideIds: []}
        describe('test addTextToSlide function', () => {
            const newTextObjId = generateGuid()
            const newTextObj: TextObject = { id: newTextObjId, position: {X: 0, Y: 0}, text: 'Test', fontsize: 16, font: 'arial', type: 'text'}
            const editedSlide: Slide = {...oneSlide, objects: [...oneSlide.objects, newTextObj]}
            it('add text to slide', () => {
                expect(addTextToSlide(presentation, oneSlideId, newTextObj.text, newTextObj.id).slides).toEqual([editedSlide])
            })  
        })
        describe('test addImageToSlide function', () => {
            const imgId = generateGuid()
            const newImg: ImageObject = {id: imgId, position: {X: 0, Y: 0}, src: 'src', width: 100, height: 100, type: 'image'}
            const editedSlide = {...oneSlide, objects: [...oneSlide.objects, newImg]}
            it('add image to slide', () => {
                expect(addImageToSlide(presentation, oneSlideId, newImg.src, newImg.id).slides).toEqual([editedSlide])
            })
        })
        describe('test removeObjectFromSlide function', () => {
            console.log(presentation)
            const textObjId = generateGuid()
            addTextToSlide(presentation, oneSlideId, 'ABC', textObjId)
            it('delete text from slide.objects', () => {
                expect(deleteObjectFromSlide(presentation, oneSlideId, textObjId).slides).toEqual([oneSlide])
            })
            const imgObjId = generateGuid()
            addImageToSlide(presentation, oneSlideId, 'src', imgObjId)
            it('delete img from slide.objects', () => {
                expect(deleteObjectFromSlide(presentation, oneSlideId, imgObjId).slides).toEqual([oneSlide])
            })
        })
        describe('test changeSlideObjectPosition function', () => {
            const textObjId = generateGuid()
            const newPos: Position = {X: 150, Y: 150}
            const textObj: TextObject = { id: textObjId, position: newPos, text: 'ABC', fontsize: 16, font: 'arial', type: 'text'}
            const editedSlide = {...oneSlide, objects: [...oneSlide.objects, textObj]}
            const presentationWithElem = addTextToSlide(presentation, oneSlideId, textObj.text, textObjId)
            it('change object position on slide', () => {
                expect(changeSlideObjectPosition(presentationWithElem, oneSlideId, textObjId, newPos).slides).toEqual([editedSlide])
            })
        })
        describe('test changeTextSize function', () => {
            const textObjId = generateGuid()
            const pos = { X: 0, Y: 0 }
            const newTextSize = 25
            const textObj: TextObject = { id: textObjId, position: pos, text: 'newText', fontsize: newTextSize, font: 'arial', type: 'text'}
            const editedSlide = {...oneSlide, objects: [...oneSlide.objects, textObj]}
            const presentationWithElem = addTextToSlide(presentation, oneSlideId, textObj.text, textObjId)
            it('change fontsize on slide', () => {
                expect(changeTextSize(presentationWithElem, oneSlideId, textObjId, newTextSize).slides).toEqual([editedSlide])
            })
        })
        describe('test changeImageSize function', () => {
            const imgObjId = generateGuid()
            const pos = { X: 0, Y: 0 }
            const imgObj: ImageObject = { id: imgObjId, position: pos, src: 'src', width: 150, height: 150, type: 'image'}
            const editedSlide = {...oneSlide, objects: [...oneSlide.objects, imgObj]}
            const presentationWithElem = addImageToSlide(presentation, oneSlideId, imgObj.src, imgObjId)
            it('change object position on slide', () => {
                expect(changeImageSize(presentationWithElem, oneSlideId, imgObjId, 150, 150).slides).toEqual([editedSlide])
            })
        })
        describe('test changeText function', () => {
            const textObjId = generateGuid()
            const newText = 'NewText'
            const pos = { X: 0, Y: 0 }
            const textObj: TextObject = { id: textObjId, position: pos, text: newText, fontsize: 16, font: 'arial', type: 'text'}
            const editedSlide = {...oneSlide, objects: [...oneSlide.objects, textObj]}
            const presentationWithElem = addTextToSlide(presentation, oneSlideId, 'ABCDE', textObjId)
            it('change text in textObj on slide', () => {
                expect(changeText(presentationWithElem, oneSlideId, textObjId, newText).slides).toEqual([editedSlide])
            })
        })
        describe('test changeFont function', () => {
            const textObjId = generateGuid()
            const newFont = 'calibri' 
            const pos = { X: 0, Y: 0 }
            const textObj: TextObject = { id: textObjId, position: pos, text: 'NewText', fontsize: 16, font: newFont, type: 'text'}
            const editedSlide = {...oneSlide, objects: [...oneSlide.objects, textObj]}
            const presentationWithElem = addTextToSlide(presentation, oneSlideId, textObj.text, textObjId)
            it('change text in textObj on slide', () => {
                expect(changeFont(presentationWithElem, oneSlideId, textObjId, newFont).slides).toEqual([editedSlide])
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