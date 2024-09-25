import { addSlide, changeSlidePosition, deleteSlide, generateGuid, rename } from "./actions"
import { Presentation, Slide, SolidBackground } from "./types"

describe('Tests', () => {
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