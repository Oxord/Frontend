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
import { Circle, 
    FigureObject, 
    ImageObject, 
    Position, 
    Presentation, 
    Reactangle, 
    Slide, 
    SolidBackground, 
    TextObject, 
    Triangle } from "../types"    

const TEXT_OBJ: TextObject = {
    id: generateGuid(), 
    position: {X: 0, Y: 0}, 
    text: 'textObj', 
    font: 'arial',
    fontsize: 16,
    type: 'text' 
}
const IMG_OBJ: ImageObject = {
    id: generateGuid(),
    position: {X: 150, Y: 150},
    src: 'src',
    width: 200, 
    height: 200,
    type: 'image'
}
const CIRCLE_OBJ: Circle = {
    id: generateGuid(),
    position: {X: 350, Y: 350},
    color: 'red',
    radius: 20,
    type: 'circle'
}
const RECT_OBJ: Reactangle = {
    id: generateGuid(),
    position: {X: 350, Y: 350},
    color: 'red',
    width: 10,
    height: 15,
    type: 'rectangle'
}
const TRIANGLE_OBJ: Triangle = {
    id: generateGuid(),
    position: {X: 350, Y: 350},
    color: 'red',
    pointOne: {X: 370, Y: 370},
    pointTwo: {X: 420, Y: 270},
    positionThree: {X: 270, Y: 270},
    type: 'triangle'
}
const FIRST_SLIDE: Slide = {
    id: generateGuid(),
    background:  {
        color: 'white',
        type: 'solid'
    },
    objects: [TEXT_OBJ, IMG_OBJ, CIRCLE_OBJ, RECT_OBJ, TRIANGLE_OBJ],
    selectedObjectIds: [TEXT_OBJ.id, IMG_OBJ.id]
}
const SECOND_SLIDE: Slide = {
    id: generateGuid(),
    background:  {
        src: 'src',
        type: 'image'
    },
    objects: [TEXT_OBJ, CIRCLE_OBJ, RECT_OBJ],
    selectedObjectIds: [CIRCLE_OBJ.id, RECT_OBJ.id]
}
const PRESENTATION: Presentation = {
    name: 'PresName', 
    slides: [FIRST_SLIDE, SECOND_SLIDE], 
    selectedSlideIds: [SECOND_SLIDE.id, FIRST_SLIDE.id]
}
const NEW_SLIDE: Slide = {
    id: generateGuid(),
    background: {
        color: 'white',
        type: 'solid'
    },
    objects: [],
    selectedObjectIds: []
}
describe('Tests with maximum data', () => {
    describe('Test Functions For Presentation Type', () => {
        describe('test rename function', () => {
            const newName: string = 'NewName'
            const renamedPres: Presentation = {
                ...PRESENTATION, 
                name: newName
            }
            it('rename presentation', () => {
                expect(rename(PRESENTATION, newName)).toEqual(renamedPres)
            })
        })
        describe('test addSlide function', () => {
            const PresentationWithNewSlide: Presentation = {
                ...PRESENTATION, 
                slides: [ ...PRESENTATION.slides, NEW_SLIDE ] 
            }
            it('add new slide to presentation', () => {
                expect(addSlide(PRESENTATION, NEW_SLIDE.id)).toEqual(PresentationWithNewSlide)
            })
        })
        describe('test deleteSlide function', () => {
            const PresentationWithNewSlide: Presentation = {
                ...PRESENTATION, 
                slides: [ ...PRESENTATION.slides, NEW_SLIDE ] 
            }
            it('delete slide from presentations.slides', () => {
                expect(deleteSlide(PresentationWithNewSlide, NEW_SLIDE.id)).toEqual(PRESENTATION)
            })
        })
        describe('test changeSlidePosition function', () => {
            const slideIds = [SECOND_SLIDE.id, FIRST_SLIDE.id]
            it('change slides position', () => {
                expect(changeSlidePosition(PRESENTATION, slideIds).slides).toEqual([SECOND_SLIDE, FIRST_SLIDE])
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
                ...FIRST_SLIDE, 
                objects: [...FIRST_SLIDE.objects, newTextObj]
            }
            const editedPres = {
                ...PRESENTATION,
                slides: [editedSlide, SECOND_SLIDE]
            }
            it('add text to slide', () => {
                expect(addTextToSlide(PRESENTATION, FIRST_SLIDE.id, newTextObj.text, newTextObj.id)).toEqual(editedPres)
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
                ...FIRST_SLIDE, 
                objects: [...FIRST_SLIDE.objects, newImg]
            }//явное созданеи новой презентации
            const editedPres = {
                ...PRESENTATION,
                slides: [editedSlide, SECOND_SLIDE]
            }
            it('add image to slide', () => {
                expect(addImageToSlide(PRESENTATION, FIRST_SLIDE.id, newImg.src, newImg.id)).toEqual(editedPres)
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
                ...FIRST_SLIDE, 
                objects: [...FIRST_SLIDE.objects, newTextObj]
            }
            const presWithTextOnSlide = {
                ...PRESENTATION,
                slides: [slideWithText, SECOND_SLIDE]
            }
            const slideWithoutText: Slide = {
                ...FIRST_SLIDE, 
                objects: [...FIRST_SLIDE.objects.filter(slideObj => slideObj.id !== newTextObj.id)]
            }
            const editedPresWithoutTextOnSlide = {
                ...PRESENTATION,
                slides: [slideWithoutText, SECOND_SLIDE]
            }
            it('delete text from slide.objects', () => {
                expect(deleteObjectFromSlide(presWithTextOnSlide, FIRST_SLIDE.id, newTextObj.id)).toEqual(editedPresWithoutTextOnSlide)
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
                ...FIRST_SLIDE, 
                objects: [...FIRST_SLIDE.objects, newImgObj]
            }
            const presWithImgOnSlide = {
                    ...PRESENTATION,
                    slides: [slideWithImg, SECOND_SLIDE]
                }
            const slideWithoutImg: Slide = {
                ...FIRST_SLIDE, 
                objects: FIRST_SLIDE.objects.filter(slideObj => slideObj.id !== newImgObj.id)
            }
            const editedPresWithoutImgOnSlide: Presentation = {
                ...presWithImgOnSlide,
                slides: [slideWithoutImg, SECOND_SLIDE]
            }
            it('delete img from slide.objects', () => {
                expect(deleteObjectFromSlide(presWithImgOnSlide, slideWithImg.id, newImgObjId)).toEqual(editedPresWithoutImgOnSlide)
            })
        })
        describe('test changeSlideObjectPosition function', () => {
            const newPos: Position = {X: 150, Y: 150}
            const editedObj: FigureObject = {
                ...CIRCLE_OBJ, 
                position: newPos
            }
            const editedSlide = {
                ...FIRST_SLIDE, 
                objects: [TEXT_OBJ, IMG_OBJ, editedObj, RECT_OBJ, TRIANGLE_OBJ]
            }
            const editedPres: Presentation = {
                ...PRESENTATION, 
                slides: [editedSlide, SECOND_SLIDE]
            }
            it('change object position on slide', () => {
                expect(changeSlideObjectPosition(PRESENTATION, FIRST_SLIDE.id, CIRCLE_OBJ.id, newPos)).toEqual(editedPres)
            })
        })
        describe('test changeFontSize function', () => {
            const newFontsize = 25
            const editedObj: TextObject = {
                ...TEXT_OBJ, 
                fontsize: newFontsize
            }
            const editedSlide = {
                ...FIRST_SLIDE, 
                objects: [editedObj, IMG_OBJ, CIRCLE_OBJ, RECT_OBJ, TRIANGLE_OBJ],
            }
            const editedPres = {
                ...PRESENTATION,
                slides: [editedSlide, SECOND_SLIDE]
            }
            it('change fontsize on slide', () => {
                expect(changeFontsize(PRESENTATION, FIRST_SLIDE.id, TEXT_OBJ.id, newFontsize)).toEqual(editedPres)
            })
        })
        describe('test changeImageSize function', () => {
            const newHeight = 200
            const newWidth = 200
            const editedObj: ImageObject = {
                ...IMG_OBJ, 
                height: newHeight, 
                width: newWidth
            }
            const editedSlide = {
                ...FIRST_SLIDE, 
                objects: [TEXT_OBJ, editedObj, CIRCLE_OBJ, RECT_OBJ, TRIANGLE_OBJ],
            }
            const editedPres = {
                ...PRESENTATION,
                slides: [editedSlide, SECOND_SLIDE]
            }
            it('change object position on slide', () => {
                expect(changeImageSize(PRESENTATION, FIRST_SLIDE.id, IMG_OBJ.id, newHeight, newWidth)).toEqual(editedPres)
            })
        })
        describe('test changeText function', () => {
            const newText = 'NewText'
            const editedObj: TextObject = {
                ...TEXT_OBJ, 
                text: newText
            }
            const editedSlide = {
                ...FIRST_SLIDE, 
                objects: [editedObj, IMG_OBJ, CIRCLE_OBJ, RECT_OBJ, TRIANGLE_OBJ],
            }
            const editedPres = {
                ...PRESENTATION,
                slides: [editedSlide, SECOND_SLIDE]
            }
            it('change text in textObj on slide', () => {
                expect(changeText(PRESENTATION, FIRST_SLIDE.id, TEXT_OBJ.id, newText)).toEqual(editedPres)
            })
        })
        describe('test changeFont function', () => {
            const newFont = 'calibri' 
            const editedObj: TextObject = {
                ...TEXT_OBJ, 
                font: newFont
            }
            const editedSlide = {
                ...FIRST_SLIDE, 
                objects: [editedObj, IMG_OBJ, CIRCLE_OBJ, RECT_OBJ, TRIANGLE_OBJ],
            }
            const editedPres = {
                ...PRESENTATION,
                slides: [editedSlide, SECOND_SLIDE]
            }
            it('change text in textObj on slide', () => {
                expect(changeFont(PRESENTATION, FIRST_SLIDE.id, TEXT_OBJ.id, newFont)).toEqual(editedPres)
            })
        })
        describe('test changeSlideBackground function', () => {
            const newBackground: SolidBackground = {
                color: 'red',
                type: 'solid'
            }
            const editedSlide = {
                ...FIRST_SLIDE, 
                background: newBackground
            }
            const editedPres = {
                ...PRESENTATION,
                slides: [editedSlide, SECOND_SLIDE]
            }
            it('chage background color', () => {
                expect(changeSlideBackground(PRESENTATION, FIRST_SLIDE.id, newBackground)).toEqual(editedPres)
            })
        })
    })
})