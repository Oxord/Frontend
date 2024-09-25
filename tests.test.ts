import { addImageToSlide, addSlide, addTextToSlide, changeSlidePosition, deleteSlide, generateGuid, rename } from "./actions"
import { ImageObject, Presentation, Slide, SolidBackground, TextObject } from "./types"

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
            const newTextObj: TextObject = { id: newTextObjId, position: {X: 0, Y: 0}, text: "Test", fontsize: 16, font: 'arial', type: 'text'}
            const editedSlide: Slide = {...oneSlide, objects: [...oneSlide.objects, newTextObj]}
            it('add text to slide', () => {
                expect(addTextToSlide(presentation, oneSlideId, newTextObj.text, newTextObj.id).slides).toEqual([editedSlide])
            })  
        })
        describe('test addImageToSlide function', () => {
            const imgId = generateGuid()
            const newImg: ImageObject = {id: imgId, position: {X: 0, Y: 0}, src:"src", width: 100, height: 100, type: 'image'}
            const editedSlide = {...oneSlide, objects: [...oneSlide.objects, newImg]}
            it('add image to slide', () => {
                expect(addImageToSlide(presentation, oneSlideId, newImg.src, newImg.id).slides).toEqual([editedSlide])
            })
        })
    })
})